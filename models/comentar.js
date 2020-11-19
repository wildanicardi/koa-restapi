'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comentar.belongsTo(models.User, {
				as: "user",
				foreignKey: "userId",
				foreignKeyConstraint: true
      });
      Comentar.belongsTo(models.Post, {
				as: "post",
				foreignKey: "postId",
				foreignKeyConstraint: true
			});
    }
  };
  Comentar.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comentar: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comentar',
  });
  return Comentar;
};