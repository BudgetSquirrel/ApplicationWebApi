import { Component, OnInit } from '@angular/core';
import { Fund } from '../models';
import { TrackingApiService } from '../tracking-api.service';

@Component({
  selector: 'bs-tracking-home',
  templateUrl: './tracking-home.component.html',
  styleUrls: ['./tracking-home.component.scss']
})
export class TrackingHomeComponent implements OnInit {

  rootFund: Fund;

  public isLoading: boolean = true;

  constructor(private trackingApi: TrackingApiService) { }

  ngOnInit() {
    this.refreshRootFund();
  }

  private async refreshRootFund() {
    this.isLoading = true;
    this.rootFund = await this.trackingApi.getCurrentRootFund();
    this.isLoading = false;
  }

}
