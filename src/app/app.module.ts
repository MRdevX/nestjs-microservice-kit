import { Module } from '@nestjs/common';
import { CoreModule } from '@root/app/core/core.module';
import { UserModule } from '@root/app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

const modules = [UserModule];

@Module({
  imports: [CoreModule, ...modules, AuthModule, TokenModule],
  controllers: [],
})
export class AppModule {}
