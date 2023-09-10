import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import { Proforma } from "./proforma";

export class ProformaItem extends Model {}

ProformaItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        proformaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proforma,
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
    },
    {
        sequelize,
        modelName: "ProformaItems",
        timestamps: false,
        underscored: true,
    }
);

ProformaItem.belongsTo(Proforma, {
    foreignKey: "proformaId",
    as: "proforma",
    onDelete: "cascade",
});

Proforma.hasMany(ProformaItem, {
    foreignKey: "proformaId",
    as: "goods",
    onDelete: "cascade",
});
