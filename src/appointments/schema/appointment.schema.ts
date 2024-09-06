import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  contact: number;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  doctorName: string;
  @Prop({ required: true })
  date: string;
  @Prop({ default: 'pending' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
