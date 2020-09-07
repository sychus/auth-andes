import { Controller, Post, Body, HttpException, HttpCode } from '@nestjs/common';
import {HttpStatus} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(200)
    @Post()
    async auth(@Body() data): Promise<any> {
        if (!data.username || !data.password) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        let rta = await this.authService.auth(data);
        if (!rta) {
            return await this.authService.authOtherDatabase(data);
        } else {
            return rta;
        }
    }
}
