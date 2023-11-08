'use strict';
import { Model } from 'sequelize';

interface CategoryAttributes {
    id: number;
    tag: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Category extends Model<CategoryAttributes>
        implements CategoryAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        tag!: string;

        static associate(models: any) {
            // define association here
            Category.belongsToMany(models.income, { through: "income_category" })
        }
    };
    Category.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'category',
        paranoid: true
    });
    return Category;
};