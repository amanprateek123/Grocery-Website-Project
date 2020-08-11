module.exports = (sequelize, Sequelize) => {
    const homepage = sequelize.define('homepage', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        heading: {
            type: Sequelize.STRING,
            allowNull: true
        },
        subHeading: {
            type: Sequelize.STRING,
            allowNull: true
        },
        value: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        fieldType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order:{
            type:Sequelize.INTEGER,
            allowNull: false
        }
    },
        {
            tableName: 'db_ld_homepage'
        }
    )

    return homepage;
};