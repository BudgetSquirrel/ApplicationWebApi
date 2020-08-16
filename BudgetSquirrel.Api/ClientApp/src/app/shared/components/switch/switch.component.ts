import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, TemplateRef } from '@angular/core';

@Component({
  selector: 'bs-switch',
  template: `
    <div local-class="switch">
      <button>
        <button *ngFor="let child of templates">
          <span *ngFor="let o of [child]" *ngForTemplate="child"></span>
        </button>
      </button>
    </div>
  `,
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() optionValues: string[];

  @Output() onSelect: EventEmitter<string> = new EventEmitter();

  @ContentChildren(TemplateRef) templates;

  constructor() { }

  ngOnInit() {
  }

  onSelectOption(option: string) {
    this.onSelect.emit(option);
  }

}
