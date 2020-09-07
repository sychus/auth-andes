import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { checkPassword } from '../../shared/ldap';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('AuthUsers')
        private readonly authModel: Model<any>
    ) {}

    async auth(data): Promise<any> {
        const user: any = await checkPassword(data.username, data.password);
        if (user) {
            return {nombre: user.nombre, apellido: user.apellido, password: user.password, email: user.email, telefono: user.telefono, du: user.du}
        } else {
            return null;
        }
      }

    // Falta enviar por parametro el método de encriptado (para hacerlo más genérico)
    async authOtherDatabase(data): Promise<any>{
        const sha1Hash = require('sha1');
        const p = sha1Hash(data.password);
        const user: any = await this.authModel.findOne({usuario: data.username, password: p}).exec();
        if (user) {
            return { 
                nombre : user.nombre, 
                apellido: user.apellido,
                usuario: user.usuario,
                password: user?.password
            }
        } else
        {
            return null
        }
        
    }
}
