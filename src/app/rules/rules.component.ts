import { Component, OnInit } from '@angular/core';
import { Rule } from '@app/@shared/models/rule.model';
import { RuleService } from '@app/@shared/services/rule.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  rules: Rule[] = [];

  constructor(private ruleService: RuleService) {}

  ngOnInit(): void {
    this.ruleService.getRules().subscribe((result) => {
      this.rules = result;
    });
  }
}
