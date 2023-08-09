// import { DataTypes, DateOnlyDataType, EnumDataType, Model } from 'sequelize';
// import { sequelize } from '../utils/Database/database';
// import Employee from './employee.model';
// import DSRStatusEnum from '../constants/enum'

// interface DSRAttributes {
//   id: number;
//   employee_id: number;
//   Project: string;
//   Date: DateOnlyDataType;
//   EstimatedHour: number;
//   DSRDescrpition: string;
//   DSRStatus: DSRStatusEnum;
// }

// class DSRModel extends Model<DSRAttributes> implements DSRAttributes {
//   public id!: number;
//   public employee_id!: number;
//   public Project!: string;
//   public Date!: DateOnlyDataType;
//   public EstimatedHour!: number;
//   public DSRDescrpition!: string;
//   public DSRStatus!: DSRStatusEnum;
// }

// DSRModel.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     employee_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Employee,
//         key: 'id',
//       },
//     },
//     Project: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     EstimatedHour: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     DSRDescrpition: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     DSRStatus: {
//       type: DataTypes.ENUM(...Object.values(DSRStatusEnum)),
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'dsrtable',
//   }
// );

// DSRModel.belongsTo(Employee, { foreignKey: 'employee_id' });

// export default DSRModel;
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/Database/database';
import EmployeeModel from './employee.model';
import DSRStatusEnum from '../constants/enum';

interface DSRAttributes {
  id: number;
  employee_id: number | null; // Use allowNull: true for nullable associations
  Project: string;
  Date: Date; // Use DataTypes.DATE for Date property
  EstimatedHour: number;
  DSRDescrpition: string;
  DSRStatus: DSRStatusEnum;
}

class DSRModel extends Model<DSRAttributes> implements DSRAttributes {
  public id!: number;
  public employee_id!: number | null; // Use allowNull: true for nullable associations
  public Project!: string;
  public Date!: Date; // Use DataTypes.DATE for Date property
  public EstimatedHour!: number;
  public DSRDescrpition!: string;
  public DSRStatus!: DSRStatusEnum;
  public employee!: EmployeeModel | null; // Use allowNull: true for nullable associations
}

DSRModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Use allowNull: true for nullable associations
      references: {
        model: EmployeeModel,
        key: 'id',
      },
    },
    Project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATEONLY, // Use DataTypes.DATE for Date property
      allowNull: false,
    },
    EstimatedHour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DSRDescrpition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DSRStatus: {
      type: DataTypes.ENUM(...Object.values(DSRStatusEnum)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'dsrtable',
  }
);

DSRModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id', as: 'employee' }); // Add the association

export default DSRModel;
