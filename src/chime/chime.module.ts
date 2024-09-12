import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChimeService } from './chime.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule global
    }),
  ],
  providers: [ChimeService],
  exports: [ChimeService],
})
export class ChimeModule {}
