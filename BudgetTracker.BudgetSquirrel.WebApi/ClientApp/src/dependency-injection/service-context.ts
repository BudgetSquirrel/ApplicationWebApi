import { createContext } from "react";
import BudgetService from "../services/budget-service";
import BackendClient from "../infrastructure/backend-client";
import AuthService from "../services/auth-service";

const backendClient = new BackendClient();
const budgetService = new BudgetService(backendClient);
const authService = new AuthService(backendClient);

interface BudgetSquirrelServices {
    backendClient: BackendClient;
    budgetService: BudgetService;
    authService: AuthService;
}

const services: BudgetSquirrelServices = {
    backendClient,
    budgetService,
    authService
};

export const ServiceContext = createContext(services);