import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bs-home",
  template: `
    <!-- Unauthenticated -->
    <bs-splash-page *isAuthenticated="false"></bs-splash-page>

    <!-- Authenticated -->
    <bs-budget-overview *isAuthenticated="true"></bs-budget-overview>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
