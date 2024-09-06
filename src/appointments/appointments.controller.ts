import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {
  CreateUserDTO,
  UpdateStatusrDTO,
  ValidateIdDTO,
} from './validationPipe/appointment.validationPipe';
import { Transform } from 'class-transformer';
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() appointmentData: CreateUserDTO) {
    return this.appointmentsService.create(appointmentData);
  }
  @Get(':id')
  async getAppointmentById(@Param(new ValidationPipe()) params: ValidateIdDTO) {
    const { id } = params;
    return this.appointmentsService.getAppointmentById(id);
  }

  @Get()
  async getAllAppointments() {
    return this.appointmentsService.getAllAppointments();
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') params: ValidateIdDTO) {
    const { id } = params;
    return this.appointmentsService.deleteAppointment(id);
  }

  @Patch(':id')
  async updateStatus(
    @Body() updateData: UpdateStatusrDTO,
    @Param('id') params: ValidateIdDTO,
  ) {
    const { id } = params;
    return this.appointmentsService.updateStatus(id, updateData);
  }
}
