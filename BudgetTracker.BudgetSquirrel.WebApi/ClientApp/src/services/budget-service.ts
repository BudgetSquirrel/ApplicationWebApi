import BackendClient from "../infrastructure/backend-client";

export default class BudgetService {
    _client: BackendClient;
    _budgetApiEndpoint: string;

    constructor(client: BackendClient, apiEndpoint: string = "budget") {
        this._client = client;
        this._budgetApiEndpoint = apiEndpoint;
    }

    async getRootBudgets() {
        let endpoint = `${this._budgetApiEndpoint}/roots`;
        let budgets = await this._client.request(endpoint);
        return budgets;
    }
}