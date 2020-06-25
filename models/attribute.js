
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Attributes = sequelize.define('attribute', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.STRING
        }

    },
        {
            tableName: 'db_ld_attribute'
        }
    )

    return Attributes;
};