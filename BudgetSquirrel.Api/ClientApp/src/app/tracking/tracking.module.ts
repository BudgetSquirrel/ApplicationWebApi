import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCheckboxModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackingHomeComponent } from './tracking-home/tracking-home.component';
import { FundComponent } from './fund/fund.component';

@NgModule({
  declarations: [
    TrackingHomeComponent,
    FundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    TrackingHomeComponent
  ]
})
export class TrackingModule { }
