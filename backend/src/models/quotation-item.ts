import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import { Quotation } from "./quotation"; // Assuming you have a Quotation model

export class QuotationItem extends Model {}

QuotationItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        quotationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Quotation,
                key: "id",
            },
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serialNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        spare: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        delivery: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        tonnage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "QuotationItem",
        timestamps: false,
        underscored: true,
    }
);

QuotationItem.belongsTo(Quotation, {
    foreignKey: "quotationId",
    as: "quotation",
    onDelete: "cascade",
});

Quotation.hasMany(QuotationItem, {
    foreignKey: "quotationId",
    as: "goods",
    onDelete: "cascade",
});
