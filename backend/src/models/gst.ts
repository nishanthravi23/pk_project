import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Customer } from "./customer";
import { Vendor } from "./vendor";

export class Gst extends Model {}

Gst.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    gstType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gstNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Customer,
        key: "id",
      },
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Vendor,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "gst",
    timestamps: true,
    underscored: true,
  }
);

Gst.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Gst.belongsTo(Vendor, {
  foreignKey: "vendorId",
  as: "vendor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Customer.hasOne(Gst, {
  foreignKey: "customerId",
  as: "gst",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Vendor.hasOne(Gst, {
  foreignKey: "vendorId",
  as: "gst",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
