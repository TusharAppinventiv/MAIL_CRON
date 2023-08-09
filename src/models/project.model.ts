import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../utils/Database/database';
import AdminModel from './admin.model';

interface ProjectAttributes {
  id: number;
  projectName: string;
  projectSummary: string;
  admin_id: number;
  allocatedHours: string;
}

class ProjectModel extends Model<ProjectAttributes> implements ProjectAttributes {
  public id: number;
  public projectName: string;
  public projectSummary: string;
  public admin_id: number;
  public allocatedHours: string;
  public admin!: AdminModel;
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectSummary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AdminModel,
        key: 'id',
      }
    },
    allocatedHours: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'projectstable',
  }
);

ProjectModel.belongsTo(AdminModel, { foreignKey: 'admin_id', as: 'admin' });

export { ProjectModel, ProjectAttributes };
