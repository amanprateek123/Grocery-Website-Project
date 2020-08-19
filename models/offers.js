module.exports = (sequelize, Sequelize=require('sequelize')) => {
    const offers = sequelize.define('offers', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        offerCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        discount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        minAmt:{
            type:Sequelize.INTEGER,
            allowNull: false
        }
    },
        {
            tableName: 'db_ld_offers'
        }
    )

    return offers;
};