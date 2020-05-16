import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bs-home",
  template: `
    <!-- Unauthenticated -->
    <bs-splash-page *isAuthenticated="false"></bs-splash-page>

    <!-- Authenticated -->
    <bs-budgets *isAuthenticated="true"></bs-budgets>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
