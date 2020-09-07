import { Module } from '@nestjs/common';
import { AuthController} from '../auth/auth.controller';
import {AuthUsers} from '../auth/schemas/auth.schema';
import { AuthService } from '../auth/auth.service'
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [MongooseModule.forFeature([{name: 'AuthUsers', schema: AuthUsers, collection: 'authUsers'}])],
    controllers: [AuthController],
    providers: [ AuthService]
})
export class AuthModule {}
