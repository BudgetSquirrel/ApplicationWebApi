import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
  selector: "bs-sign-up",
  template: `
    <p>
      sign-up works!
    </p>
  `,
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

}
