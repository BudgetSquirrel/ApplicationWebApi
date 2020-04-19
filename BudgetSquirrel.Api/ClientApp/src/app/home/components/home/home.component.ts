import { Component, OnInit } from "@angular/core";
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: "bs-home",
  template: `
    <p>
      home works!
    </p>
    <button (click)="deleteUser()">Delete User</button>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  public ngOnInit() {

  }

  public deleteUser() {
    this.accountService.deleteUser().then((x => console.log(x)));
  }

}
