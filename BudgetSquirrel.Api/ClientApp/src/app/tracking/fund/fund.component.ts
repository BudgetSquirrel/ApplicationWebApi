import { Component, Input, OnInit } from '@angular/core';
import { Fund } from '../models';

@Component({
  selector: 'bs-tracking-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  @Input() fund: Fund;
  @Input() level: number;

  public isCollapsed: boolean = false;

  public get isLeaf(): boolean {
    const hasChildren = this.fund.subFunds && this.fund.subFunds.length > 0;
    return !hasChildren
  }

  public get childrenLevel(): number {
    return this.level + 1;
  }

  public get isShowingChildren(): boolean {
    return !this.isLeaf && !this.isCollapsed;
  }

  public get toggleCollapseButtonLabel(): string {
    if (this.isCollapsed) {
      return `Expand sub funds for ${this.fund.name}`;
    } else {
      return `Collapse sub funds for ${this.fund.name}`;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  public onToggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
