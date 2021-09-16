import { Module } from '@nestjs/common';
import { CoreModule } from '@root/app/core/core.module';
import { UserModule } from '@root/app/user/user.module';
import { AuthModule } from './auth/auth.module';

const modules = [UserModule];

@Module({
  imports: [CoreModule, ...modules, AuthModule],
  controllers: [],
})
export class AppModule {}
