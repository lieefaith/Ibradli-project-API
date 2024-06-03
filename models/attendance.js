const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");
  const Attendance = sequelize.define(
    "attendance",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participant_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "events",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attendance_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
    },
    {
      tableName: "attendance",
      freezeTableName: true
    }
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.events, {
      foreignKey: "event_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
};
  
module.exports = Attendance
