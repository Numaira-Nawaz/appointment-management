import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ChimeHelper } from './chime.Helper';
@Injectable()
export class ChimeService {
  constructor(private readonly chimeHelper: ChimeHelper) {}
  async createMeeting() {
    const externalMeetingId = new Types.ObjectId();
    return this.chimeHelper.createMeeting('123456987');
  }
}
