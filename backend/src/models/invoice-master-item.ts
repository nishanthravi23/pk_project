import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import { InvoiceMaster } from "./invoice-master"; // Assuming you have an InvoiceMaster model

export class InvoiceMasterItem extends Model {}

InvoiceMasterItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    invoiceMasterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: InvoiceMaster,
        key: "id",
      },
    },
    HTA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Product Description": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "HSN/SAC": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    QTY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UOM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RATE: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    Value: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "InvoiceMasterItem",
    timestamps: false,
    underscored: true,
  }
);

InvoiceMasterItem.belongsTo(InvoiceMaster, {
  foreignKey: "invoiceMasterId",
  as: "invoiceMaster",
  onDelete: "cascade",
});

InvoiceMaster.hasMany(InvoiceMasterItem, {
  foreignKey: "invoiceMasterId",
  as: "items",
  onDelete: "cascade",
});
