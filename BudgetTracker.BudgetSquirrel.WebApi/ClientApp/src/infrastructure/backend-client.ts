import axios from 'axios';
import User from '../ViewModels/user';

interface ApiRequest {
    arguments?: any;
}

export default class BackendClient {
    _apiRoot: string;

    _authToken?: string;
    _authExpiration: Date | null;

    constructor(apiRoot: string = "/api") {
        this._apiRoot = apiRoot;
        this._authExpiration = null;
    }

    async request(endpoint: string, request: ApiRequest = {}) {
        let response: any;
        await axios({
            method: "post",
            url: this._urlForEndpoint(endpoint),
            data: request,
            headers: {
                Authorization: `Bearer ${this._authToken}`
            }
        }).then(result => {response = result.data;});

        return response;
    }

    async authenticate(username:string, password:string): Promise<User | null> {
        let user: User | null = null;
        await axios({
            method: "post",
            url: this._urlForEndpoint("auth/authenticate"),
            data: { username, password }
        }).then(response => {
            this._authToken = response.data.token;
            this._authExpiration = new Date(response.data.expires);
            user = response.data.user;
        });
        return user;
    }

    _urlForEndpoint(endpoint: string) {
        let apiRoot = this._apiRoot;
        if (!apiRoot.endsWith("/"))
            apiRoot = `${apiRoot}/`;
        
        let apiEndpoint = endpoint;
        if (apiEndpoint.startsWith("/"))
            apiEndpoint = apiEndpoint.slice(1);
        
        return `${apiRoot}${apiEndpoint}`;
    }
}