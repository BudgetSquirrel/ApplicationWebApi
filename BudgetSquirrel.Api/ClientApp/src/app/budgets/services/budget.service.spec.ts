import { TestBed } from "@angular/core/testing";

import { BudgetingService } from "./budgeting.service";

describe("BudgetService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BudgetingService = TestBed.get(BudgetingService);
    expect(service).toBeTruthy();
  });
});
