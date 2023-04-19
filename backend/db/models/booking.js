'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Booking.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: this.startDate
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
    indexes: [
      {
        unique: true,
        fields: ['spotId', 'userId', 'startDate', 'endDate']
      }
    ]
  });
  return Booking;
};