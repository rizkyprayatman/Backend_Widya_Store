'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'id',
      });
    }
  }
  ProfileUser.init({
    userId: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProfileUser',
    tableName: "profiles",
  });
  return ProfileUser;
};