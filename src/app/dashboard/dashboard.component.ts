import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    title = 'UI/UX Template';
    activeTab = 1;
    fontSizeOption: string = 'medium';
    isDarkTheme = false;
    selectedMenu: any;
  
    constructor(private renderer: Renderer2) { }
  
    ngOnInit(): void {
      if (typeof document !== 'undefined') {
        this.renderer.addClass(document.documentElement, 'light-theme');
        this.applyFontSize();
      }
    }
  
    toggleFontSize(option: string): void {
      this.fontSizeOption = option;
      this.applyFontSize(); // Apply the selected font size
    }
  
    applyFontSize(): void {
      const root = document.documentElement;
      switch (this.fontSizeOption) {
        case 'small':
          this.renderer.setStyle(root, 'font-size', '14px');
          break;
        case 'medium':
          this.renderer.setStyle(root, 'font-size', '16px');
          break;
        case 'large':
          this.renderer.setStyle(root, 'font-size', '18px');
          break;
        default:
          this.renderer.setStyle(root, 'font-size', '16px'); // Default to medium font size
      }
    }
  
    toggleTheme(): void {
      this.isDarkTheme = !this.isDarkTheme;
      const root = document.documentElement;
      if (this.isDarkTheme) {
        this.renderer.addClass(root, 'dark-theme');
        this.renderer.removeClass(root, 'light-theme');
      } else {
        this.renderer.addClass(root, 'light-theme');
        this.renderer.removeClass(root, 'dark-theme');
      }
    }
}
