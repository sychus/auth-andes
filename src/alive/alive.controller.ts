import { Controller, Get } from '@nestjs/common';
import { AliveService } from './alive.service';

@Controller('alive')
export class AliveController {
    constructor(private readonly aliveService: AliveService) {}
    @Get()
    alive(): string {
        return this.aliveService.alive();
      }
}
