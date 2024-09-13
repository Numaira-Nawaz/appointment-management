import {  Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../appointment.enum';

export type AppointmentDocument = Appointment & Document;
@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  contact: number;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  doctorName: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ enum: Status, default: Status.PENDING })
  status: string;
  @Prop({ required: true })
  diagnosis: string;
  @Prop()
  appointment_type: string;
  @Prop()
  prescription: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
