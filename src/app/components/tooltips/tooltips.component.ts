import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrl: './tooltips.component.scss'
})
export class TooltipsComponent {
  tooltipI = `
  import {MatTooltipModule} from '@angular/material/tooltip';`;

  tooltipH = `
  <button mat-raised-button #tooltip="matTooltip" matTooltip="Info about the action"
    [matTooltipPosition]="'above'" matTooltipHideDelay="100000" class="btn btn-primary">
      Tooltip
  </button>`;

  tooltipA = `

  [matTooltipPosition]="'above'"`;
  tooltipB = `

  [matTooltipPosition]="'below'"`;
  tooltipL = `
  
  [matTooltipPosition]="'left'"`;
  tooltipR = `
  
  [matTooltipPosition]="'right'"`;
}

