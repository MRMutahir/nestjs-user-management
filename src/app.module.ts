import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
// import { User } from './Entity/user.entity';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
