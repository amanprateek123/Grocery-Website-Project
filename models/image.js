
module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('image', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        src: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
        {
            tableName: 'db_ld_Image'
        }
    )

    return Image;
};