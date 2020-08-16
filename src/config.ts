export const ldapServer = {
    host : process.env.LDAP_SERVER || 'some ldap',
    port : process.env.LDAP_PORT || '389',
    ou: process.env.LDAP_OU || 'ou=People,o=someOrganization,o=someData'
};

export const authServer = {
    server : {
        host: process.env.AUTH_SERVER || 'localhost',
        port: process.env.AUTH_PORT || 3000
    }
}
