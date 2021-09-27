import { Module } from '@nestjs/common';
import { CoreModule } from '@root/app/core/core.module';
import { UserModule } from '@root/app/user/user.module';

const modules = [UserModule];

@Module({
  imports: [CoreModule, ...modules],
  controllers: [],
})
export class AppModule {}
