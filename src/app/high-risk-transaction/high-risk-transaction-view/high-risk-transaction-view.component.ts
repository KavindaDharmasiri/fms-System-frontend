import {Component, OnInit} from '@angular/core';
import {Navigation, Router} from "@angular/router";
import {HighRiskService} from "../../configurations/services/high-risk/high-risk.service";

@Component({
  selector: 'app-high-risk-transaction-view',
  templateUrl: './high-risk-transaction-view.component.html',
  styleUrl: './high-risk-transaction-view.component.scss'
})
export class HighRiskTransactionViewComponent implements OnInit{
  public highRiskElement: any;
  elementStatus : string = "UNSUCCESSFUL";
  private navigation: Navigation | null;
  protected groupNameString: string = '';
  constructor(
    private router: Router,
    private highRiskService: HighRiskService
  ) {
    this.navigation = this.router.getCurrentNavigation();
  }

  rules = [
    { ruleName: '', ruleGroup: '' }
  ];

  groupedRules: { [key: string]: any[] } = {};
  expandedGroups: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.highRiskElement = this.highRiskService.getElement();
    if (this.highRiskElement) {
      this.elementStatus = "SUCCESSFUL";
      console.log(this.highRiskElement.tranPacket.firedRules);
      this.rules = this.highRiskElement.tranPacket.firedRules;
      this.rules.forEach(rule => {
        if (!this.groupedRules[rule.ruleGroup]) {
          this.groupedRules[rule.ruleGroup] = [];
        }
        this.groupedRules[rule.ruleGroup].push(rule);
      });
      this.groupNameString = this.getGroupNameString();
      // Optional: Clear after use
      // this.highRiskService.clearElement();
    } else {
      this.elementStatus = "UNSUCCESSFUL";
      console.log("failed");
    }
  }

  getGroupNameString(): string {
    const uniqueGroups = Array.from(new Set(this.rules.map(r => r.ruleGroup)));
    return uniqueGroups.join(' | ');
  }

  trackByRuleName(index: number, rule: any): any {
    return rule.ruleName || index;
  }

  toggleGroup(index: number): void {
    this.expandedGroups[index] = !this.expandedGroups[index];
  }
}
