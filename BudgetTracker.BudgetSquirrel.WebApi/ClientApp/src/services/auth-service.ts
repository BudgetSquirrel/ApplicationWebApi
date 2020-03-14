import BackendClient from "../infrastructure/backend-client";
import User from "../ViewModels/user";

export default class AuthService {
    _client: BackendClient;
    _authApiEndpoint: string;
    currentUser: User | null;

    constructor(client: BackendClient, apiEndpoint: string = "auth") {
        this._client = client;
        this._authApiEndpoint = apiEndpoint;
        this.currentUser = null;
    }

    async login(username: string, password: string) {
        this.currentUser = await this._client.authenticate(username, password);
    }
}