import { Controller, Post } from '@nestjs/common';
import { ChimeService } from './chime.service.js';

@Controller('chime')
export class ChimeController {
  constructor(private readonly chimeService: ChimeService) {}

  @Post('create-meeting')
  async createMeeting() {
    return await this.chimeService.createMeeting();
  }
}
