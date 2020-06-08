
module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define('category', {
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
    },
        {
            tableName: 'db_ld_category'
        }
    )

    return category;
};