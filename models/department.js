

module.exports = (sequelize, Sequelize) => {
    const department = sequelize.define('db_ld_department', {
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

    return department;
};