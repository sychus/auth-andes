import { Injectable } from '@nestjs/common';
import { checkPassword } from '../../shared/ldap';

@Injectable()
export class AuthService {
    async auth(data): Promise<any> {
        const user: any = await checkPassword(data.username, data.password);
        if (user) {
            return {nombre: user.nombre, apellido: user.apellido, email: user.email, telefono: user.telefono, du: user.du}
        } else {
            return null;
        }
      }
}
