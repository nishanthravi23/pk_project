import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import BankDetails from "./bank-details";

export class BankTransaction extends Model {
    [x: string]: any;
}

BankTransaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        // add this afterwards
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        // },
        bank_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BankDetails,
                key: "id",
            },
        },
        withdraw_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true, // Adjust as needed
        },
    },
    {
        sequelize,
        modelName: "BankTransaction",
        timestamps: false,
        underscored: true,
    }
);

export default BankTransaction;
