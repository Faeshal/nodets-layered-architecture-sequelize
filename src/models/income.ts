'use strict';
import { Model } from 'sequelize';

interface IncomeAttributes {
    id: number;
    name: string;
    value: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Income extends Model<IncomeAttributes>
        implements IncomeAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: string;
        value!: number;

        static associate(models: any) {
            // define association here
            Income.belongsTo(models.user)
            Income.belongsToMany(models.category, { through: "income_category" })
        }
    };
    Income.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        value: DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'income',
        paranoid: true
    });
    return Income;
};