import { TestBed } from "@angular/core/testing";
import { BudgetApi } from './budget-api.service';

describe("BudgetApi", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BudgetApi = TestBed.get(BudgetApi);
    expect(service).toBeTruthy();
  });
});
