import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

export class Proforma extends Model {}

Proforma.init(
    {
        //  fields for Proforma
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        gstin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        // companyname: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //   },
        // address: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //   },
        poNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        piNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        customerName: {
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
        modelName: "proforma",
        timestamps: false,
        underscored: true,
    }
);
