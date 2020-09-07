import { Module } from '@nestjs/common';
import { AliveController } from '../alive/alive.controller';
import { AliveService } from '../alive/alive.service';

@Module({
    imports: [],
    controllers: [AliveController],
    providers: [ AliveService]
})
export class AliveModule {}
