import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChimeService {
  private chime: AWS.Chime;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-2');

    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region,
    });

    this.chime = new AWS.Chime({
      region,
      endpoint: 'https://service.chime.aws.amazon.com/console',
    });
  }

  async createMeeting(): Promise<AWS.Chime.CreateMeetingResponse> {
    const request = { ClientRequestToken: `meeting-${Date.now()}` };
    return this.chime.createMeeting(request).promise();
  }

  async createAttendee(
    meetingId: string,
  ): Promise<AWS.Chime.CreateAttendeeResponse> {
    const request = {
      MeetingId: meetingId,
      ExternalUserId: `attendee-${Date.now()}`,
    };
    return this.chime.createAttendee(request).promise();
  }
}
