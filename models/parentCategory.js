
module.exports = (sequelize, Sequelize) => {
    const parentCategory = sequelize.define('db_ld_parentCategory', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return parentCategory;
};