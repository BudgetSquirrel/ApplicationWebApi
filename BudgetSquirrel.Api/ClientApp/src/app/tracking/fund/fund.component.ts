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

  public isLeaf: boolean;
  public childrenLevel: number;

  constructor() { }

  ngOnInit() {
    this.isLeaf = this.fund.subFunds.length == 0;
    this.childrenLevel = this.level + 1;
  }

}
