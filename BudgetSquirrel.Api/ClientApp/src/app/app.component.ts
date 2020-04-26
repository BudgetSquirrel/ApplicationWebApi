import { Component } from "@angular/core";

@Component({
  selector: "bs-root",
  template: `
    <bs-top-nav-bar></bs-top-nav-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "budgetsquirrel";
}
