import { ProjectModel, ProjectAttributes } from '../models/project.model';

class ProjectService {
  async createProject(projectData: ProjectAttributes): Promise<ProjectModel> {
    try {
      const project = await ProjectModel.create(projectData);
      return project;
    } catch (error) {
      throw new Error('Unable to create project');
    }
  }

  async getProjectById(projectId: number): Promise<ProjectModel | null> {
    try {
      const project = await ProjectModel.findByPk(projectId);
      return project;
    } catch (error) {
      throw new Error('Unable to fetch project');
    }
  }

  async updateProject(projectId: number, projectData: Partial<ProjectAttributes>): Promise<ProjectModel | null> {
    try {
      const project = await ProjectModel.findByPk(projectId);
      if (!project) {
        return null;
      }
      await project.update(projectData);
      return project;
    } catch (error) {
      throw new Error('Unable to update project');
    }
  }

  async deleteProject(projectId: number): Promise<void> {
    try {
      const project = await ProjectModel.findByPk(projectId);
      if (project) {
        await project.destroy();
      }
    } catch (error) {
      throw new Error('Unable to delete project');
    }
  }
}

export default new ProjectService();
