import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';
import { ChimeModule } from './chime/chime.module';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from './twilio/twilio.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/appoitment-management'),
    ChimeModule,
    AppointmentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TwilioModule,
  ],
})
export class AppModule {}
