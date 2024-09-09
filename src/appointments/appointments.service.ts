import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schema/appointment.schema';
import {
  CreateUserDTO,
  UpdateStatusrDTO,
  ValidateIdDTO,
} from './validationPipe/appointment.validationPipe';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private AppointmentModel: Model<AppointmentDocument>,
  ) {}

  async getAllAppointments() {
    return this.AppointmentModel.find();
  }

  async create(appointment: CreateUserDTO) {
    try {
      const canCreate = await this.canCreateAppointment();
      if (!canCreate) {
        throw new Error(
          'You can only create one appointment every 15 minutes.',
        );
      }
      const newAppointment = this.AppointmentModel.create(appointment);
      return newAppointment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAppointmentById(id: string) {
    return this.AppointmentModel.findById(id);
  }

  async deleteAppointment(id: string) {
    return this.AppointmentModel.findByIdAndDelete(id);
  }

  async updateStatus(id: string, updateData: UpdateStatusrDTO) {
    return this.AppointmentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async canCreateAppointment() {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);    
    const existingAppointment = await this.AppointmentModel.findOne({
      createdAt: {
        $gte: fifteenMinutesAgo,
      },
    });
    console.log(!existingAppointment);
    if (!existingAppointment) {
      return true;
    }
    return false;
  }

  async getAllAppointmentsByDoctorName(drName: string) {
    return this.AppointmentModel.find({ doctorName: drName });
  }
}
