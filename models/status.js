
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Status = sequelize.define('status', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        },
        index: {
            type: Sequelize.INTEGER
        }
    },
        {
            tableName: 'db_ld_status'
        }
    )

    return Status;
};