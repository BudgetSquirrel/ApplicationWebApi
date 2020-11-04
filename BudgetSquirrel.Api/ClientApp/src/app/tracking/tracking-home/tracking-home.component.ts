import { Component, OnInit } from '@angular/core';
import { Fund } from '../models';
import { TrackingApiService } from '../tracking-api.service';

@Component({
  selector: 'bs-tracking-home',
  template: `
    <p>
      {{this.rootFund?.name}}
    </p>
  `,
  styleUrls: ['./tracking-home.component.scss']
})
export class TrackingHomeComponent implements OnInit {

  rootFund: Fund;

  constructor(private trackingApi: TrackingApiService) { }

  ngOnInit() {
    this.refreshRootFund();
  }

  private async refreshRootFund() {
    this.rootFund = await this.trackingApi.getCurrentRootFund();
  }

}
