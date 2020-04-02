import { Component } from "@angular/core";

@Component({
  selector: "bs-root",
  template: `
    <bs-top-nav-bar></bs-top-nav-bar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "budgetsquirrel";
}
