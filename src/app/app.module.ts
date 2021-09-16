import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [User],
})
export class AppModule {}
