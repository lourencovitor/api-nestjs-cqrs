import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  database: 'db',
  entities: [__dirname + '/../model/**/*.entity.{js,ts}'],
  synchronize: true,
};
