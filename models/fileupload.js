'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fileupload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fileupload.init({
    filename: DataTypes.STRING,
    filesize: DataTypes.DOUBLE,
    mimetype: DataTypes.STRING,
    extension: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fileupload',
  });
  return Fileupload;
};