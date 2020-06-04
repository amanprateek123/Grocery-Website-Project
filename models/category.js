
module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define('category', {
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
        parentCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return category;
};