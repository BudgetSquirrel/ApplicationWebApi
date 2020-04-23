import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-vertical-page-section',
  template: `
  <div class="vert-section">
    <div class="vert-section__content">
      <ng-content select=".content"></ng-content>
    </div>
  </div>
  `,
  styleUrls: ['./vertical-page-section.component.scss']
})
export class VerticalPageSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
