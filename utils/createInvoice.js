
function createInvoice(doc, order) {
    generateHeader(doc);
    generateCustomerInformation(doc, order);
    generateInvoiceTable(doc, order);
    generateFooter(doc);
}

function generateHeader(doc) {
    doc
        .image("public/logos/shop_invoice_logo.png", 50, 55, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("LalaDukaan Pvt.", 110, 57)
        .fontSize(10)
        .text("LalaDukaan Pvt.", 200, 50, { align: "right" })
        .text("123 Main Street", 200, 65, { align: "right" })
        .text("New York, NY, 10025", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, order) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(order.id, 150, customerInformationTop)
        .font("Helvetica")
        .text("Order Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date(order.createdAt)), 150, customerInformationTop + 15)
        .text("Invoice Date:", 50, customerInformationTop + 30)
        .text(formatDate(new Date()), 150, customerInformationTop + 30)
        .text("Balance Due:", 50, customerInformationTop + 45)
        .text(
            formatCurrency(order.price),
            150,
            customerInformationTop + 45
        )
        .text("Transaction ID:", 50, customerInformationTop + 60)
        .text(order.transactionId, 150, customerInformationTop + 60)

        .font("Helvetica-Bold")
        .text(`${order.user.firstName} ${order.user.lastName}`, 300, customerInformationTop)
        .font("Helvetica")
        .text(getAddress(order.shippingAddress), 300, customerInformationTop + 15)
        .moveDown();

    generateHr(doc, customerInformationTop + 80);
}


let subtotalPosition;
function generateInvoiceTable(doc, order) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Description",
        "Unit Cost",
        "Quantity",
        "Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < order.orderItems.length; i++) {
        const item = order.orderItems[i];
        const position = invoiceTableTop + (i + 1) * 45;
        generateTableRow(
            doc,
            position,
            item.sku.code,
            item.sku.product.name,
            formatCurrency(item.sku.price),
            item.quantity,
            formatCurrency(item.sku.price * item.quantity)
        );

        generateHr(doc, position + 35);
    }

    subtotalPosition = invoiceTableTop + (i + 1) * 45;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Delivery Charges",
        "",
        formatCurrency(order.deliveryCharges)
    );
    subtotalPosition += 20;
    generateHr(doc, subtotalPosition - 5);
    doc.font('Helvetica-Bold');
    generateTableRow(
        doc,
        subtotalPosition + 5,
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(order.price)
    );
    subtotalPosition += 20;
    generateHr(doc, subtotalPosition);

    // const paidToDatePosition = subtotalPosition + 20;
    // generateTableRow(
    //     doc,
    //     paidToDatePosition,
    //     "",
    //     "",
    //     "Paid To Date",
    //     "",
    //     formatCurrency(order.paid)
    // );

    // const duePosition = paidToDatePosition + 25;
    // doc.font("Helvetica-Bold");
    // generateTableRow(
    //     doc,
    //     duePosition,
    //     "",
    //     "",
    //     "Balance Due",
    //     "",
    //     formatCurrency(order.subtotal - order.paid)
    // );
    // doc.font("Helvetica");
}

function generateFooter(doc) {
    let footerTop = subtotalPosition + 15;
    doc
        .moveDown()
        .font("Helvetica-Bold")
        .text("Sold By : ", 50, footerTop + 15)
        .font("Helvetica")
        .text("LalaDukaan Pvt.", 150, footerTop + 15)
        .font("Helvetica-Bold")
        .text("Ship From Address : ", 50, footerTop + 30)
        .font("Helvetica")
        .text("No. 42/1 & 43, Some Location at Bengluru, India.", 150, footerTop + 30)

    generateHr(doc, footerTop + 55)

    doc.fontSize(8).text('*keep this Invoice and manufacturer box for warrantee purposes.', 50, footerTop + 70, { align: 'center' });
    doc.fontSize(10).moveDown().text('If you have queries please contact billing@laladukaan.com', { align: 'center' });
    doc.fontSize(8).text('LalaDukaan - All rights reserved', { align: 'center' });
}


function getAddress(jsonAddress) {
    let addr = JSON.parse(jsonAddress);
    return `${addr.address}\n${addr.city},${addr.state}- ${addr.zip}\n${addr.country}`
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y, { width: 90 })
        .text(description, 150, y, { width: 150 })
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(dd) {
    return "$" + (dd).toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createInvoice
};