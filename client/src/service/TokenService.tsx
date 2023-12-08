import { Manager } from "../model/Manager";

export class TokenService {
    public saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    public getToken(): string | null {
        return localStorage.getItem("token");
    }

    public saveUserInfo(manager: Manager) {
        localStorage.setItem("manager", JSON.stringify(manager.toJson()));
    }

    public getUserInfo() {
        const data = JSON.parse(localStorage.getItem("manager") ?? "{}");
        return Manager.deserialize(data);
    }
}

export const tokenService = new TokenService();
