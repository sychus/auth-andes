import { Injectable } from '@nestjs/common';

@Injectable()
export class AliveService {
    alive(): string {
        return 'El servicio está operativo';
      }
}
