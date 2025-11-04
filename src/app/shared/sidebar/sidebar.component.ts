import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isClosed = false;
  currentRoute: string = '';
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'ph ph-squares-four',
      badge: '05',
      route: '/dashboard',
    },
    {
      label: 'User Management',
      icon: 'ph ph-users',
      submenu: [
        { label: 'User Role', route: '/user-management/user-role' },
        { label: 'System Users', route: '/user-management/system-users' },
        { label: 'Privilege Management', route: '/user-management/user-privileges' },

      ],
      expanded: false
    },
    {
      label: 'Configurations',
      icon: 'ph ph-warning-circle',
      submenu: [
        { label: 'Payment Network', route: '/configurations/payment-network' },
        { label: 'Dual Authentication', route: '/configurations/dual-auth' },
        { label: 'Reaction Templates', route: '/configurations/reaction-templates' },
        { label: 'Transaction Element ', route: '/configurations/transaction-element' },
        { label: 'Rule', route: '/configurations/rule-configuration' },
        { label: 'Rule Group', route: '/configurations/rule-group' },
      ],
      expanded: false
    },
    {
      label: 'Analysis & Testing',
      icon: 'ph ph-flask',
      submenu: [
        { label: 'Live Simulation', route: '/analysis-testing/live-simulation' },
        { label: 'Rule Testing & Validation', route: '/analysis-testing/rule-testing' },
      ],
      expanded: false
    },
    {
      label: 'High Risk Transaction',
      icon: 'ph ph-money',
      route: '/high-risk-transaction'
    },
    {
      label: 'Validate Transaction',
      icon: 'ph ph-shield-check',
      route: '/validate-transaction'
    },
    /*{
      label: 'Components',
      icon: 'ph ph-gear',
      submenu: [
        { label: 'Button', route: '/components/buttons' },
        { label: 'Forms', route: '/components/form' },
        { label: 'Tables', route: '/components/table' },
        { label: 'Accordion', route: '/components/accordion' },
        { label: 'Badge', route: '/components/badge' },
        { label: 'Carousel', route: '/components/carousel' },
        { label: 'Charts', route: '/components/charts' },
        { label: 'Modal', route: '/components/modal' },
        { label: 'Offcanvas', route: '/components/offcanvas' },
        { label: 'Tabs', route: '/components/tabs' },
        { label: 'Tree', route: '/components/tree' },
        { label: 'Toaster & Sweet Alert', route: '/components/alerts' },
        { label: 'Dual List Box', route: '/components/dualListBox' },
      ],
      expanded: false
    },*/

  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateMenuState();
      }
    });
  }

  updateMenuState() {
    this.menuItems.forEach(item => {
      if (item.submenu) {
        item.expanded = item.submenu.some(sub => this.currentRoute.startsWith(sub.route));
      }
    });
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }


  toggleSubmenu(item: any, event: Event) {
    event.preventDefault(); // Prevents navigation when clicking the main menu
    item.expanded = !item.expanded;
  }
  selectMenu(item: any, event: Event) {
    event.preventDefault(); // Prevents navigation


  }
  currentYear: number = new Date().getFullYear();
}
