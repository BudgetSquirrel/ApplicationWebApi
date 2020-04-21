import { Component, OnInit } from "@angular/core";
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: "bs-home",
  template: `
    <p>
      home works!
    </p>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  public ngOnInit() {

  }
}
