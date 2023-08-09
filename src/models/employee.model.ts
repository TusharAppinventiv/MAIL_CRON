import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../utils/Database/database'

interface EmployeeAttributes{
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    session: Boolean;
}

class EmployeeModel extends Model<EmployeeAttributes> implements EmployeeAttributes{
    public id: number;
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public session: Boolean;
    public isAbsent: Boolean;
}

EmployeeModel.init(
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    session:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
     sequelize,
     tableName: 'employetable'
    }
    
);
export default EmployeeModel;
