import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChimeController } from './chime.controller';
import { ChimeService } from './chime.service';
import { ChimeHelper } from './chime.Helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ChimeService, ChimeHelper],
  controllers: [ChimeController],
  exports: [ChimeService],
})
export class ChimeModule {}
