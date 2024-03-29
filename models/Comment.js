const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//creating Comment model
class Comment extends Model { }


Comment.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment',
    }
);
    
module.exports = Comment;