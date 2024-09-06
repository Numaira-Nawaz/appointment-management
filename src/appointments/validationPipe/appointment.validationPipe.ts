import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
} from 'class-validator';
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
  date: Date;
}

export class UpdateStatusrDTO {
  @IsEnum(Status)
  status: Status;
}

export class ValidateIdDTO {
  @IsMongoId({ message: 'please enter a valid id' })
  id: string;
}
