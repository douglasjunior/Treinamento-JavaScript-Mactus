const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './banco.sqlite',
    define: {
        freezeTableName: true,
        timestamps: true,
        charset: 'utf8'
    },
});

const User = sequelize.define('user', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    name: Sequelize.STRING(100),
    username: Sequelize.STRING(40),
    password: Sequelize.STRING(255),
    birthday: Sequelize.DATEONLY,
});


module.exports = {
    sequelize, 
    User,
}
