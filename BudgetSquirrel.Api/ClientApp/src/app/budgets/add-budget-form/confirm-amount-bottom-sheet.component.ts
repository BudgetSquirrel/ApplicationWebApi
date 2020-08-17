import { Component, OnInit, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models';


@Component({
    selector: "bs-confirm-budget-bottom-sheet",
    template: `
        <div id="bottom-sheet">
            <div class="sheet-content">
                You have exceed the set amount for the budget {{this.parentBudget.name}}
                by {{this.amount}} dollars, would you like to update the parent budget?
            </div>
            <button mat-button type="button" (click)="closeBar()">Close</button>
            <button mat-button type="button" (click)="updateParent()">Update</button>
        </div>
    `,
    styles: ["#bottom-sheet { display: flex; justify-content: space-between; }",
             ".sheet-content { margin: 24px }"]
})
export class ConfirmAmountBottomSheetComponent implements OnInit {
    constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmAmountBottomSheetComponent>,
                private budgetService: BudgetService,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    public amount: number;
    public parentBudget: Budget;

    public ngOnInit() {
        this.amount = this.data.amount;
        this.parentBudget = this.data.parent;
    }

    public closeBar() {
        this.bottomSheetRef.dismiss({
            message: "Close"
        });
    }

    public updateParent() {
        const amountToUpdate = this.parentBudget.setAmount + this.amount;

        this.budgetService.editBudgetSetAmount(this.parentBudget, amountToUpdate);
        this.bottomSheetRef.dismiss({
            message: "Updated"
        });
    }
}
