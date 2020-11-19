'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
				as: "user",
				foreignKey: "userId",
				foreignKeyConstraint: true
      });
      Post.hasMany(models.Like, {
				as: "like",
				foreignKey: "postId",
				foreignKeyConstraint: true
      });
      Post.hasMany(models.Comentar, {
				as: "comentar",
				foreignKey: "postId",
				foreignKeyConstraint: true
			});
    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};