module.exports = (sequelize, Sequelize) => {
    const homepage = sequelize.define('homepage', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fieldType:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        {
            tableName: 'db_ld_homepage'
        }
    )

    return homepage;
};