import { Request, Response } from 'express';
import projectService from '../services/project.service';

class ProjectController {
  async createProject(req: Request, res: Response) {
    try {
      const projectData = req.body;
      const project = await projectService.createProject(projectData);
      return res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.id);
      const project = await projectService.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json({ project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.id);
      const projectData = req.body;
      const updatedProject = await projectService.updateProject(projectId, projectData);
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const projectId = Number(req.params.id);
      await projectService.deleteProject(projectId);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new ProjectController();
