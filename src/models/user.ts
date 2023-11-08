'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes>
        implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        username!: string;
        email!: string;
        password!: string;
        role!: string;

        static associate(models: any) {
            // define association here
            User.hasMany(models.income)
        }
    };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'user',
        paranoid: true
    });
    return User;
};