import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChimeService } from './chime.service';
import { ChimeController } from './chime.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ChimeService],
  controllers: [ChimeController],
  exports: [ChimeService],
})
export class ChimeModule {}
