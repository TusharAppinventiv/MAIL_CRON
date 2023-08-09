// controllers/dsr.controller.ts
import { Request, Response } from 'express';
import { DSRService } from '../services/dsr.service';
import  DSRStatusEnum  from '../constants/enum';

export class DSRController {
  static async createDSR(req: Request, res: Response) {
    try {
      const { employee_id, Project, Date, EstimatedHour, DSRDescrpition } = req.body;

      const dsr = await DSRService.createDSR(employee_id, Project, Date, EstimatedHour, DSRDescrpition);

      return res.status(201).json(dsr);
    } catch (error) {
      console.error('Error creating DSR:', error);
      return res.status(500).json({ error: 'Unable to create DSR' });
    }
  }

  static async editDSR(req: Request, res: Response) {
    try {
      const { id, Project, Date, EstimatedHour, DSRDescrpition } = req.body;

      const dsr = await DSRService.editDSR(id, Project, Date, EstimatedHour, DSRDescrpition);

      return res.status(200).json(dsr);
    } catch (error) {
      console.error('Error editing DSR:', error);
      return res.status(500).json({ error: 'Unable to edit DSR' });
    }
  }
  static async acceptPendingDSR(req: Request, res: Response) {
    try {
      const { dsrId } = req.params;
      const userId = req.adminId;

      const acceptedDSR = await DSRService.acceptPendingDSR(Number(dsrId), userId);

      return res.status(200).json(acceptedDSR); // Return the accepted DSR object
    } catch (error) {
      console.error('Error accepting DSR:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteDSR(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await DSRService.deleteDSR(id);

      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting DSR:', error);
      return res.status(500).json({ error: 'Unable to delete DSR' });
    }
  }
}
