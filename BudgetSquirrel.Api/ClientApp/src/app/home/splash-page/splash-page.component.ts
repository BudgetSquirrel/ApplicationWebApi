import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../shared/services/account.service";
import { ROUTES } from "../../route-constants";

@Component({
  selector: "bs-splash-page",
  templateUrl: "./splash-page.component.html",
  styleUrls: ["./splash-page.component.scss"]
})
export class SplashPageComponent implements OnInit {

  readonly routes = ROUTES;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
