'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReplyComentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReplyComentar.belongsTo(models.User, {
				as: "user",
				foreignKey: "userId",
				foreignKeyConstraint: true
      });
      ReplyComentar.belongsTo(models.Comentar, {
				as: "comentar",
				foreignKey: "comentarId",
				foreignKeyConstraint: true
			});
    }
  };
  ReplyComentar.init({
    userId: DataTypes.INTEGER,
    comentarId: DataTypes.INTEGER,
    reply: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ReplyComentar',
  });
  return ReplyComentar;
};