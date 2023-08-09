import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../utils/Database/database';
interface AdminAttributes{
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    session: Boolean;
}

class AdminModel extends Model<AdminAttributes> implements AdminAttributes{
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public session!: Boolean;
}

AdminModel.init(
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    session: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
},
{
    sequelize,
    tableName: 'admintable'
}
);
export default AdminModel;
