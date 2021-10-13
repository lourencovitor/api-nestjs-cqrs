import { ApiProperty } from '@nestjs/swagger';

export class GetUsersResponseDto {
  @ApiProperty({
    description: 'User id',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  userId = '';

  @ApiProperty({ description: 'Name', example: 'Name' })
  name = '';


  @ApiProperty({ description: 'Email', example: 'email@example.com' })
  email = '';

  @ApiProperty({ description: 'Password', example: '******' })
  password = '';
}