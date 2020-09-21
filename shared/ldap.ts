import { ldapServer } from '../src/config';
const isReachable = require('is-reachable');
const ldapjs = require('ldapjs');

// Función auxiliar
function sleep(ms) {
    return new Promise((resolve) => { setTimeout(() => resolve('timeout'), ms); });
}

function transform(input) {
    let str = JSON.stringify(input).substr(24);
    str = str.substring(0, str.length - 1);
    return (String.fromCharCode.apply(String, JSON.parse(str)));
}

function getObjeto(entry: any) {
    let obj = {
        dn: entry.dn.toString(),
        controls: [],
        mail: null,
        telephoneNumber: null,
        sn: Buffer,
        cn: null,
        givenName: null,
        uid: null,
        carLicense: null,
        objectClass: null
    };
    entry.attributes.forEach(
        (a) => {
            let item = a.buffers;
            if (item && item.length) {
                if (item.length > 1) {
                    obj[a.type] = item.slice();
                } else {
                    obj[a.type] = item[0];
                }
            } else {
                obj[a.type] = [];
            }
        });
    return obj;
}

export async function checkPassword(user, password): Promise<any> {
    const server = `${ldapServer.host}:${ldapServer.port}`;
    const ldapPromise = new Promise((resolve, reject) => {
        isReachable(server).then(reachable => {
            if (!reachable) {
                return resolve('timeout');
            }
            // Conecta a LDAP
            const dn = 'uid=' + user + ',' + ldapServer.ou;
            const ldap = ldapjs.createClient({
                url: `ldap://${ldapServer.host}`,
                timeout: 4000,
                connectTimeout: 4000,
            });
            ldap.on('connectError', (err) => {
                return resolve('timeout');
            });
            ldap.on('error', (err) => {
                return resolve('timeout');
            });
            ldap.on('connect', () => {
                ldap.bind(dn, password, (err) => {
                    if (err) {
                        if (err.name === 'InvalidCredentialsError') {
                            return resolve('invalid');
                        } else {
                            return;
                        }
                    }
                    ldap.search(dn, {
                        scope: 'sub',
                        filter: '(uid=' + user + ')',
                        paged: false,
                        sizeLimit: 1
                    }, (err2, searchResult) => {
                        if (err2) {
                            return resolve('invalid');
                        }
                        searchResult.on('searchEntry', (entry) => {
                            const obj = getObjeto(entry);
                            const dto = {
                                nombre: transform(obj.givenName),
                                apellido: transform(obj.sn),
                                email: entry.object?.mail,
                                password: entry.object?.userPassword,
                                telefono: entry.object?.telephoneNumber,
                                du: entry.object?.uid
                            }
                            return resolve(dto);
                        });

                        searchResult.on('error', (err3) => {
                            return resolve('invalid');
                        });
                    });
                });
            });

        });

    });
    const response = await Promise.race([ldapPromise, sleep(3000)]);
    if (response === 'timeout') {
        return null
    } else if (response === 'invalid') {
        return null;
    } else {
        return response;
    }
}