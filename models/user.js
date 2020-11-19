'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.VerificationToken, {
        as: 'verificationtoken',
        foreignKey: 'userId',
        foreignKeyConstraint: true,
      });
      User.hasMany(models.Post, {
        as: 'post',
        foreignKey: 'userId',
        foreignKeyConstraint: true,
      });
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};