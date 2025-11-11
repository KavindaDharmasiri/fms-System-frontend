import { Component, Input } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  pageTitle: string = 'Page Title'; // Default title

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        child.data.subscribe(data => {
          this.pageTitle = data['title'] || 'Page Title';
        });
      });
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }


  getUserName(): string {
    const userDetails = sessionStorage.getItem('user_details');
    if (userDetails) {
      try {
        return JSON.parse(userDetails).username || 'User';
      } catch {
        return 'User';
      }
    }
    return 'User';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
