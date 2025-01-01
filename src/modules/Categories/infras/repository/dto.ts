import { DataTypes, Model, Sequelize } from "sequelize";

export class CategoryPersistence extends Model {
    declare id: number;
    declare status: string;
}

export const modelName = "Category"

export function init(sequelize: Sequelize) {
    CategoryPersistence.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive', 'deleted'),
                allowNull: false,
                defaultValue: 'active'
            }

        }, {
        sequelize,
        modelName: modelName,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: "categories"
    }
    )
}