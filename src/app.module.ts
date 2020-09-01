import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AliveController } from './alive/alive.controller';
import { AliveService } from './alive/alive.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AliveController],
  providers: [AppService, AliveService],
})
export class AppModule {}
