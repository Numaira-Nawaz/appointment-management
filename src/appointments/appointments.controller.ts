import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './schema/appointment.schema';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() appointmentData: Appointment) {
    return this.appointmentsService.create(appointmentData);
  }
  @Get()
  async getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }
}
