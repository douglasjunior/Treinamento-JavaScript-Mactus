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
    username: {
        unique: true,
        type: Sequelize.STRING(40)
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(255)
    },
    birthday: Sequelize.DATEONLY,
},
    // {
    //     defaultScope: {
    //         attributes: {
    //             exclude: ['password']
    //         }
    //     }
    // }
);

const Task = sequelize.define('task', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    description: {
        allowNull: false,
        type: Sequelize.TEXT
    }
})

User.hasMany(Task, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: 'user_id'
});

module.exports = {
    sequelize,
    User,
    Task,
}
