

module.exports = (sequelize, Sequelize) => {
    const department = sequelize.define('department', {
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
            tableName: 'db_ld_department'
        }
    )

    return department;
};