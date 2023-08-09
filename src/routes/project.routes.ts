import { Router } from 'express';
import projectController from '../controllers/project.controller';

const router = Router();

router.post('/create', projectController.createProject);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
