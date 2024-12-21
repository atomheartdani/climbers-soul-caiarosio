import { Component, OnInit } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Rule } from '@app/@shared/models/rule.model';
import { RuleService } from '@app/@shared/services/rule.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatAnchor, MatIcon],
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
