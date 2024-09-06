import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schema/appointment.schema';
import { CreateUserDTO } from './validationPipe/appointment.validationPipe';

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
    const newAppointment = this.AppointmentModel.create(appointment);
    return newAppointment;
  }

  async getAppointmentById(id: string) {
    return this.AppointmentModel.findById(id);
  }

  async deleteAppointment(id: string) {
    return this.AppointmentModel.findByIdAndDelete(id);
  }
}
