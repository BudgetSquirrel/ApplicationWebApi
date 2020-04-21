import { Component } from "@angular/core";

@Component({
  selector: "bs-root",
  template: `
    <bs-top-nav-bar></bs-top-nav-bar>
    <div class="standard-padding">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "budgetsquirrel";
}
