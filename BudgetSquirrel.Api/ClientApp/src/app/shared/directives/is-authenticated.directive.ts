import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { AccountService } from "../services/account.service";

@Directive({
  selector: "[isAuthenticated]"
})
export class IsAuthenticatedDirective {
  @Input() isAuth: boolean;

  private hasView = false;

  constructor(private userService: AccountService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
                this.userService.getUser().subscribe(_ => {
                  this.updateView();
                });
  }

  private updateView() {
    let showElement: boolean;

    if (this.isAuth) {
      showElement = this.userService.isAuthenticated();
    } else {
      showElement = !this.userService.isAuthenticated();
    }

    if (showElement && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!showElement && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
