import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";

export class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM,
      values: ["kg", "l", "nos"],
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "itemMaster",
    timestamps: false,
    underscored: true,
  }
);

Item.belongsTo(Department, {
  foreignKey: "deptId",
  as: "department",
});

Department.hasMany(Item, {
  foreignKey: "deptId",
  as: "items",
});
