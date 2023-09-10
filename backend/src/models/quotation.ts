import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class Quotation extends Model {}

Quotation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        quoteNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gstin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hsnCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "quotation",
        timestamps: false,
        underscored: true,
    }
);

export default Quotation;
