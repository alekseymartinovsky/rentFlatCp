export class Manager {
    public phone: string;
    public email: string;
    public login: string;
    id: number;

    constructor() {}

    static deserialize(data: any): Manager {
        const manager = new Manager();
        manager.phone = data?.phone;
        manager.email = data.email;
        manager.login = data?.login;
        manager.id = data.id;
        return manager;
    }

    public toJson() {
        return {
            phone: this.phone,
            email: this.email,
            id: this.id,
            login: this.login,
        };
    }
}
