// services/dsr.service.ts
import DSRModel from '../models/DSR.model';
import  DSRStatus from '../constants/enum';
import { Op } from 'sequelize';
import { sendReminderEmail } from './email.service';
import EmployeeModel from '../models/employee.model';
// import cron from 'node-cron';

export class DSRService {
  static async createDSR(employee_id: number, Project: string, Date: Date, EstimatedHour: number, DSRDescrpition: string) {
    // Check if the user making changes is an admin
    return DSRModel.create({
      employee_id,
      Project,
      Date,
      EstimatedHour,
      DSRDescrpition,
      DSRStatus: DSRStatus.PENDING, // Set the initial status to PENDING
    });
  }

  static async editDSR(id: number, Project: string, Date: Date, EstimatedHour: number, DSRDescrpition: string) {
    const dsr = await DSRModel.findByPk(id);

    if (!dsr) {
      throw new Error('DSR not found');
    }

    // Check if the user making changes is an admin and if the DSRStatus is not "PRESENT" or "ABSENT"
    if (dsr.DSRStatus === DSRStatus.PRESENT || dsr.DSRStatus === DSRStatus.ABSENT) {
      throw new Error('Cannot edit DSR after it is set to Present or Absent.');
    }

    dsr.Project = Project;
    dsr.Date = Date;
    dsr.EstimatedHour = EstimatedHour;
    dsr.DSRDescrpition = DSRDescrpition;

    return dsr.save();
  }

  static async acceptPendingDSR(dsrId: number, userId: number) {
    const dsr = await DSRModel.findByPk(dsrId);

    if (!dsr) {
      throw new Error('DSR not found');
    }

    if (dsr.employee_id !== userId) {
        throw new Error('Not authorized to accept this DSR');
      }

    if (dsr.DSRStatus !== DSRStatus.PENDING) {
      throw new Error('DSR is not in a pending state');
    }

    dsr.DSRStatus = DSRStatus.PRESENT;
    await dsr.save();

    return dsr;
  }
static async deleteDSR(id: number) {
    const dsr = await DSRModel.findByPk(id);

    if (!dsr) {
      throw new Error('DSR not found');
    }

    // Check if the user making changes is an admin and if the DSRStatus is not "PRESENT" or "ABSENT"
    if (dsr.DSRStatus === DSRStatus.PRESENT || dsr.DSRStatus === DSRStatus.ABSENT) {
      throw new Error('Cannot delete DSR after it is set to Present or Absent.');
    }

    return dsr.destroy();
  }
  
  static async sendPendingReminderEmails() {
    try {
      const reminderDate = new Date();
// console.log('Current date:', reminderDate);


      const pendingDSRs = await DSRModel.findAll({
        where: {
          DSRStatus: DSRStatus.PENDING,
          Date: {
            [Op.lte]: reminderDate, // Filter DSRs that have a date less than or equal to the current date and time
          },
        },
        include: [
          // Include the 'employee' association to get the employee details
          {
            model: EmployeeModel,
            as: 'employee',
          },
        ],
      });

      if (pendingDSRs && pendingDSRs.length > 0) {
        pendingDSRs.forEach((dsr) => {
          console.log('Found pending DSR:', dsr.id, dsr.Date);

          const emailText = `Dear ${dsr.employee?.firstName} ${dsr.employee?.lastName},\n\nYour DSR for ${dsr.Date} is still pending. Please submit it as soon as possible.`;
          console.log('Sending reminder email to:', dsr.employee?.email);
          sendReminderEmail(dsr.employee?.email, 'Pending DSR Reminder', emailText);
        });
      } else {
        console.log('No pending DSRs found for reminders.');
      }
    } catch (error) {
      console.error('Error sending pending DSR reminders:', error);
    }
  }
  static async markAbsentForOverdueDSRs() {
    try {
      const overdueDSRs = await DSRModel.findAll({
        where: {
          DSRStatus: 'Pending',
          Date: {
            [Op.lt]: new Date(new Date().setDate(new Date().getDate() - 2)), // Two days ago
          },
        },
        include: [
          {
            model: EmployeeModel,
            as: 'employee',
          },
        ],
      });

      for (const dsr of overdueDSRs) {
        // Mark DSR as absent
        dsr.DSRStatus = DSRStatus.ABSENT;
        await dsr.save();
        console.log('Found absent DSR:', dsr.id, dsr.Date);

        // Send email to employee about the absent status
        const emailText = `Dear ${dsr.employee?.firstName} ${dsr.employee?.lastName},\n\nYour DSR for ${dsr.Date} has been marked as Absent as it was not submitted in time.`;
        await sendReminderEmail(dsr.employee?.email, 'Absent DSR Notification', emailText);
      }

      console.log('Absent DSRs processing completed.');
    } catch (error) {
      console.error('Error marking absent DSRs:', error);
    }
  }
  }

