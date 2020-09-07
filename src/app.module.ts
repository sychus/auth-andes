import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliveModule } from './alive/alive.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_SERVER, { useNewUrlParser: true }),
    AuthModule,
    AliveModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
