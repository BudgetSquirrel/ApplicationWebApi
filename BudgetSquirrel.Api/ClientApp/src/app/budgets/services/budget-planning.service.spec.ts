import { TestBed } from '@angular/core/testing';

import { BudgetPlanningService } from './budget-planning.service';

describe('BudgetPlanningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetPlanningService = TestBed.get(BudgetPlanningService);
    expect(service).toBeTruthy();
  });
});
