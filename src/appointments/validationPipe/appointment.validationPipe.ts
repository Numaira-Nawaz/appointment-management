import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../appointment.enum';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'please enter a name' })
  name: string;
  @IsEmail({}, { message: 'enter the correct email address' })
  email: string;
  @IsString()
  contact: string;
  @IsString()
  doctorName: string;
  @IsString()
  date: string;
}

export class UpdateStatusrDTO {
  @IsString()
  status: Status;
}
