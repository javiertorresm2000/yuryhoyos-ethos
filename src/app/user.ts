export class User {
    static ROL_OWNER = -1;
    static ROL_ADMIN = 1;
    static ROL_ADMIN_PERISHABLE = 2;
    static ROL_AUDITOR = 3;
    static ROL_INVESTIGATOR = 4;

    static getUser() {
        return JSON.parse( localStorage.getItem("user") )
    }

    static getRol() {
        return User.getUser().rol
    }

    static isNotOwner() : boolean {
        const rol = User.getUser().rol;

        return User.getUser().rol != User.ROL_OWNER
    }

    static isInvestigator(): boolean {
        return this.getRol().rol == User.ROL_INVESTIGATOR
    }
}
