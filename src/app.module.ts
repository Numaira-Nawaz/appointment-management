import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/appoitment-management'),
    AppointmentsModule,
  ],
})
export class AppModule {}
