import { Component } from "@angular/core";

@Component({
  selector: "bs-root",
  template: `
    <div class="app-root">
      <bs-top-nav-bar></bs-top-nav-bar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "budgetsquirrel";
}
