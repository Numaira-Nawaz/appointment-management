import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateUserDTO,
  UpdateStatusrDTO,
} from './validationPipe/appointment.validationPipe';
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

  @Patch(':id')
  async updateStatus(
    @Body() updateData: UpdateStatusrDTO,
    @Param('id') id: string,
  ) {
    return this.appointmentsService.updateStatus(id, updateData);
  }
}
