import { Controller, Post, Param } from '@nestjs/common';
import { ChimeService } from './chime.service.js';

@Controller('chime')
export class ChimeController {
  constructor(private readonly chimeService: ChimeService) {}

  @Post('create-attendee/:meetingId')
  async createAttendee(@Param('meetingId') meetingId: string) {
    return await this.chimeService.createAttendee(meetingId);
  }

  @Post('create-meeting')
  async createMeeting() {
    return await this.chimeService.createMeeting();
  }
}
