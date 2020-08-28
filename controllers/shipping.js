const db = require("../utils/database");
const { Op } = require("sequelize");


exports.getOrders = async (req, res) => {
    let where = {}
    let limit = 10;
    parseInt(req.query.limit) ? (limit = Math.max(0, parseInt(req.query.limit))) : null;
    let offset = (parseInt(req.query.page) - 1) * limit || 0;
    req.query.id ? (where.id = req.query.id) : null
    req.query.date ? (where.createdAt = { [Op.gt]: new Date(req.query.date) }) : null
    req.query.statusId ? (where.statusId = req.query.statusId) : null;
    req.query.status ? (where['$status.status$'] = req.query.status) : null;
    req.query.skuId ? (where['$orderItems.sku.id$'] = req.query.skuId) : null;

    let emptyOptions = {
        subQuery: false,
        group: ['id'],
        nest: true,
        where: {
            ...where
        },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: limit,
        attributes: ['id'],
        include: [
            {
                model: db.orderItem,
                attributes: [],
                include: {
                    model: db.sku,
                    attributes: [],
                    include: [
                        {
                            model: db.product,
                            attributes: [],
                        },
                        {
                            model: db.image,
                            attributes: [],
                        }
                    ]
                },


            },
            {
                model: db.status,
                attributes: [],
            },
            {
                model: db.user,
                attributes: [],
            }
        ],
    }

    let meta = { count: {} };

    db.shipping.findAll({
        where: {
            userId: req.userId
        }
    })
        .then(orders => {
            let orderIds = orders.map(o => o.orderId)
            return db.order.findAll({
                ...emptyOptions,
                where: {
                    ...where,
                    id: { [Op.in]: orderIds }
                }
            })
        })
        .then(orders => {
            let orderIds = orders.map(o => o.id)
            return db.order.findAll({
                where: {
                    id: { [Op.in]: orderIds }
                },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.orderItem,
                        include: {
                            model: db.sku,
                            attributes: { exclude: ['json', 'createdAt', 'updatedAt'] },
                            include: [
                                {
                                    model: db.product,
                                    attributes: { exclude: ['description', 'keywords', 'createdAt', 'updatedAt'] }
                                },
                                {
                                    model: db.image,
                                    attributes: ['src']
                                }
                            ]
                        },


                    },
                    {
                        model: db.status,
                        attributes: ['status', 'index']
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    }
                ],
            })
        })
        .then(orders => {
            orders = orders.map(o => {
                o = o.toJSON();
                o.deliveryCharges = o.price - o.orderItems.reduce((total, oi) => total + oi.sku.price, 0);
                return o;
            })

            orders.forEach(order => {
                let filtered = [];
                for (let oi of order.orderItems) {
                    let existing = filtered.find(foi => foi.skuId == oi.skuId);
                    if (existing) {
                        existing.quantity++;
                    }
                    else {
                        filtered.push({ ...oi, quantity: 1 })
                    }
                }

                order.orderItems = filtered;
            })

            res.json({ meta, orders });
        }).catch(err => {
            res.json(err)
            console.error(err);
        })
}


exports.setStatus = async (req, res) => {
    let orderId = req.body.orderId;
    let statusId = req.body.statusId;
    let remarks = req.body.remarks || null;

    try {
        let order = await db.order.findByPk(orderId);
        if (remarks) order.remarks = remarks;

        // State Specific Notifications / Emails 
        switch (statusId) {

            case 3: // SHIPPED
                // Revert from delivered to Shipped
                // await order.save();
                // console.log('[_] SHIPPED');
                break;

            case 4: // DELIVERED

                if (order.statusId != 3) {
                    break;
                }
                order.statusId = statusId;
                order.save();
                console.log('[_] DELIVERED');
                break;

        }

        res.json({ status: 200, message: `Order ${['Ordered', 'Packed', 'Shipped', 'Delivered'][orderId]}` })
    }
    catch (err) {
        console.log(err);
        res.json({ status: 500, error: err });
    }

}
