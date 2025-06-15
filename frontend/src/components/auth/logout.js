import {AuthUtils} from "../../utils/auth-utils.js";
import {AuthService} from "../../services/auth-service";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.logout().then();
    }

    async logout() {
        // request

        await AuthService.logout({
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)
        })
        AuthUtils.removeAuthInfo();
        this.openNewRoute('/login');
    }
}