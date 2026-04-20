import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionComponent } from './accordion/accordion.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ChartsComponent } from './charts/charts.component';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { TableComponent } from './table/table.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToastrsSweetalertsComponent } from './toastrs-sweetalerts/toastrs-sweetalerts.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TreeComponent } from './tree/tree.component';
import { DualListBoxComponent } from './dual-list-box/dual-list-box.component';

const routes: Routes = [
  {
    path: 'accordion',
    component: AccordionComponent,
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
  },
  {
    path: 'badge',
    component: BadgeComponent,
  },
  {
    path: 'carousel',
    component: CarouselComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'modal',
    component: ModalComponent,
  },
  {
    path: 'offcanvas',
    component: OffcanvasComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'tabs',
    component: TabsComponent,
  },
  {
    path: 'tooltips',
    component: TooltipsComponent,
  },
  {
    path: 'tree',
    component: TreeComponent,
  },
  {
    path: 'alerts',
    component: ToastrsSweetalertsComponent,
  },
  {
    path: 'dualListBox',
    component: DualListBoxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
