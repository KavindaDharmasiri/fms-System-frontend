import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dual-auth',
    loadChildren: () => import('./dual-auth/dual-auth.module').then((m) => m.DualAuthModule),
    data: {title: 'Dual Authentication'}
  },
  {
    path: 'rule-group',
    loadChildren: () => import('./rule-group/rule-group.module').then((m) => m.RuleGroupModule),
    data: { title: 'Rule Group Management' }
  },
  {
    path: 'reaction-templates',
    loadChildren: () => import('./reaction-templates/reaction-templates.module').then((m) => m.ReactionTemplatesModule),
    data: {title: 'Alerting Template Management'}
  },
  {
    path: 'transaction-element',
    loadChildren: () => import('./transaction-element/transaction-element.module').then((m) => m.TransactionElementModule),
    data: { title: 'Transaction Element' }
  },
  {
    path: 'payment-network',
    loadChildren: () => import('./payment-network/payment-network.module').then((m) => m.PaymentNetworkModule),
    data: { title: 'Payment Network' }
  },
  {
    path: 'rule-configuration',
    loadChildren: () => import('./rule-configuration/rule-configuration.module').then((m) => m.RuleConfigurationModule),
    data: { title: 'Rule Configuration Management' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
