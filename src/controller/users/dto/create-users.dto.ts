import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ description: 'Name', example: 'Name' })
  @IsNotEmpty({ message: 'Catalog name required' })
  @IsString({ message: 'It has to be of type string' })
  name = '';


  @ApiProperty({ description: 'Email', example: 'email@example.com' })
  @IsNotEmpty({ message: 'Catalog name required' })
  @IsString({ message: 'It has to be of type string' })
  email = '';

  @ApiProperty({ description: 'Password', example: '******' })
  @IsNotEmpty({ message: 'Catalog name required' })
  @IsString({ message: 'It has to be of type string' })
  password = '';
}