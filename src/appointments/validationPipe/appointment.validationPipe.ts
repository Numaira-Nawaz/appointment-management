import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

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
