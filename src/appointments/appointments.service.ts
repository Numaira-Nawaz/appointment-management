import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schema/appointment.schema';
import {
  CreateUserDTO,
  UpdateStatusrDTO,
  ValidateIdDTO,
} from './validationPipe/appointment.validationPipe';
import { BadRequestException } from '@nestjs/common';
import { Status } from './appointment.enum';

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
        // $lte: new Date(Date.now()),
      },
    });
    console.log('found', existingAppointment);
    if (!existingAppointment) {
      return true;
    }
    return false;
  }

  async getAllAppointmentsByDoctorName(drName: string) {
    const doctorAppointments = this.AppointmentModel.find({
      doctorName: drName,
      status: Status.PENDING,
    });
    console.log('doctorAppointments', doctorAppointments);
    return doctorAppointments;
  }

  async cancelAppointment(id: string) {
    const appointment = await this.AppointmentModel.findById(id);
    if (appointment) {
      appointment.status = Status.CANCELLED;
      await appointment.save();
      return appointment;
    }
    throw new NotFoundException('Appointment not found');
  }

  async scheduleFollowUp(id: string, prescription: string) {
    const appointment = await this.AppointmentModel.findById(id,{status:'completed'});
    if (appointment) {
      appointment.status = Status.REOPEN;
      appointment.appointment_type = 'follow-up';
      appointment.prescription = prescription;
      await appointment.save();
      return appointment;
    }
    throw new NotFoundException('Appointment not found');
  }
}
