import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class BankDetails extends Model {}

BankDetails.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_no: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        branch: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "BankDetails",
        timestamps: false,
        underscored: true,
    }
);

export default BankDetails;
