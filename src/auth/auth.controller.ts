import { Controller, Post, Body, HttpException } from '@nestjs/common';
import {HttpStatus} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async auth(@Body() data): Promise<any> {
        if (!data.username || !data.password) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const rta = await this.authService.auth(data);
        if (!rta) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return rta
    }
}
