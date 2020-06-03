import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "bs-notification-banner",
  template: `
    <div [ngClass]= "[messageType === 'ERROR' ? 'notificationError' : 'notificationInfo']">
      <img *ngIf="messageType === 'ERROR'"
           src="../../../../assets/report_problem-black-18dp.svg"
           alt="An error occured"
           width="24px">
      <img *ngIf="messageType !== 'ERROR'"
           src="../../../../assets/info-black-18dp.svg"
           alt="An info message"
           width="24px">
      {{message}}
    <div>
  `,
  styleUrls: ["./notification-banner.component.scss"]
})
export class NotificationBannerComponent implements OnInit {

  @Input() public message: string;
  @Input() public linkUrl: string;
  @Input() public messageType: string;

  constructor() { }

  public ngOnInit() {
  }

}
