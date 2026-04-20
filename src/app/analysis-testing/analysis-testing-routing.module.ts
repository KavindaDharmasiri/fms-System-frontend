import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LiveSimulationComponent} from "./live-simulation/live-simulation.component";
import {RuleTestingValidationComponent} from "./rule-testing-validation/rule-testing-validation.component";

const routes: Routes = [
  {
    path:'live-simulation',
    component:LiveSimulationComponent,
    data: {title: 'Live Simulation'}
  },
  {
    path:'rule-testing',
    component:RuleTestingValidationComponent,
    data: { title: 'Rule Testing & Validation' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisTestingRoutingModule { }
