
module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define('db_ld_category', {
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

    return category;
};