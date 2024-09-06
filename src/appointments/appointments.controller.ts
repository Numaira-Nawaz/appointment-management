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
import { CreateUserDTO } from './validationPipe/appointment.validationPipe';
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() appointmentData: CreateUserDTO) {
    return this.appointmentsService.create(appointmentData);
  }
  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Get()
  async getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentsService.deleteAppointment(id);
  }
}
