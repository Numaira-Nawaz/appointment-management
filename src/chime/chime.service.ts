import { Injectable } from '@nestjs/common';
import { ChimeHelper } from './chime.Helper';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ChimeService {
  constructor(private readonly chimeHelper: ChimeHelper) {}

  async createMeeting() {
    const externalId = uuidv4();

    return await this.chimeHelper.createMeeting(externalId);
  }

  async createAttendee(meetingId: string) {
    return await this.chimeHelper.createAttendee(meetingId);
  }
}
