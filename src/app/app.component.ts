import { Component, OnInit } from '@angular/core';
import { AuditTrackerService } from './shared/services/audit-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fraud-system';

  constructor(private auditTracker: AuditTrackerService) {}

  ngOnInit(): void {
    console.log('App component initialized with audit tracker');
    // Initialize audit tracking globally
  }
}