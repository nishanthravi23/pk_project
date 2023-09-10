import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class InvoiceMaster extends Model {}

InvoiceMaster.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PAN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GSTIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Invoice Ref": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Address Line 1": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Address Line 2": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Address Line 3": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Customer Code": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Customer GSTIN": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "invoiceMaster",
    timestamps: false,
    underscored: true,
  }
);

export default InvoiceMaster;
