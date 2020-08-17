import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, TemplateRef } from "@angular/core";

export interface SwitchOption<T> {
  identifier: T;
  text: string;
}

@Component({
  selector: "bs-switch",
  template: `
    <div local-class="switch">
      <button
        *ngFor="let option of this.optionValues"
        class="switch__option"
        [ngClass]="{'switch__option--active': option.identifier == this.activeOption}"
        (click)="this.onSelectOption(option)">
        {{option.text}}
      </button>
    </div>
  `,
  styleUrls: ["./switch.component.scss"]
})
export class SwitchComponent implements OnInit {

  @Input() optionValues: SwitchOption<any>[];
  @Input() activeOption: any;

  @Output() onSelect: EventEmitter<SwitchOption<any>> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectOption(option: SwitchOption<any>) {
    this.onSelect.emit(option);
  }

}
