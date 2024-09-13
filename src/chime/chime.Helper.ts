import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChimeSDKMeetingsClient,
  CreateAttendeeCommand,
  CreateAttendeeCommandInput,
  CreateAttendeeCommandOutput,
  CreateMeetingCommand,
  CreateMeetingCommandInput,
  CreateMeetingCommandOutput,
} from '@aws-sdk/client-chime-sdk-meetings';

@Injectable()
export class ChimeHelper {
  private chimeClient: ChimeSDKMeetingsClient;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_CHIME_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    this.chimeClient = new ChimeSDKMeetingsClient({
      region,
      endpoint: 'https://meetings-chime.us-east-1.amazonaws.com',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async createMeeting(
    externalMeetingId: string,
  ): Promise<CreateMeetingCommandOutput> {
    console.log(
      'Region: ' + this.configService.get<string>('AWS_CHIME_REGION'),
    );

    const request: CreateMeetingCommandInput = {
      ClientRequestToken: `meeting-${Date.now()}`,
      ExternalMeetingId: externalMeetingId,
      MediaRegion: this.configService.get<string>('AWS_CHIME_REGION'),
    };

    const command = new CreateMeetingCommand(request);
    return this.chimeClient.send(command);
  }

  async createAttendee(
    meetingId: string,
  ): Promise<CreateAttendeeCommandOutput> {
    const request: CreateAttendeeCommandInput = {
      MeetingId: meetingId,
      ExternalUserId: `attendee-${Date.now()}`,
    };
    const command = new CreateAttendeeCommand(request);
    return this.chimeClient.send(command);
  }
}
