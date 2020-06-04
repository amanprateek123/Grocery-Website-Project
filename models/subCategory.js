
module.exports = (sequelize, Sequelize) => {
    const subCategory = sequelize.define('subCategory', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return subCategory;
};