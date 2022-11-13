import { Component, OnInit } from '@angular/core';
import { RuleService } from '@app/@shared/services/rule.service';
import { arrayToTree, TreeItem } from 'performant-array-to-tree';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  rulesTree: TreeItem[] = [];

  constructor(private ruleService: RuleService) {}

  ngOnInit(): void {
    this.ruleService.getRules().subscribe((result) => {
      this.rulesTree = arrayToTree(result);
      console.log(this.rulesTree);
    });
  }
}
