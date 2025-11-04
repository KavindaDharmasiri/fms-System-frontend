// import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// // @ts-ignore: Ignore TypeScript error if typings aren't available
//
// @Component({
//   selector: 'app-dual-list-box',
//   templateUrl: './dual-list-box.component.html',
//   styleUrl: './dual-list-box.component.scss'
// })
// export class DualListBoxComponent implements OnInit, AfterViewInit {
//
//   @ViewChild('selectRef', { static: true }) selectRef!: ElementRef<HTMLSelectElement>;
//   dualListboxInstance: any;
//
//   ngOnInit(): void {
//
//   }
//
//   ngAfterViewInit(): void {
//     this.initializeDualListbox();
//   }
//
//   initializeDualListbox(): void {
//     this.dualListboxInstance = new DualListbox(this.selectRef.nativeElement, {
//       availableTitle: 'Available Items',
//       selectedTitle: 'Selected Items',
//
//       // Phosphor Icons for buttons
//       addButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-right"></i></button>',
//       removeButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-left"></i></button>',
//       addAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-right"></i></button>',
//       removeAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-left"></i></button>',
//
//       sortable: true,
//       upButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-upt"></i></button>',
//       downButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-down"></i></button>',
//
//       draggable: true,
//
//       addEvent: (value: any) => console.log('Added:', value),
//       removeEvent: (value: any) => console.log('Removed:', value),
//     });
//     setTimeout(() => {
//       this.addSearchIcons();
//     }, 500);
//
//     this.dualListboxInstance.addEventListener('added', (event: any) => {
//       console.log('Item added:', event.addedElement);
//     });
//
//     this.dualListboxInstance.addEventListener('removed', (event: any) => {
//       console.log('Item removed:', event.removedElement);
//     });
//   }
//   addSearchIcons(): void {
//     document.querySelectorAll('.dual-listbox__search').forEach((input) => {
//       const wrapper = document.createElement('div');
//       wrapper.classList.add('search-input-wrapper');
//
//       const icon = document.createElement('i');
//       icon.classList.add('ph', 'ph-magnifying-glass', 'search-icon');
//
//       input.parentNode?.insertBefore(wrapper, input);
//       wrapper.appendChild(input);
//       wrapper.appendChild(icon);
//     });
//   }
// }


import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
// @ts-ignore: Ignore TypeScript error if typings aren't available
import DualListbox from 'dual-listbox';
declare var DualListbox: any;

@Component({
  selector: 'app-dual-list-box',
  standalone: true,
  templateUrl: './dual-list-box.component.html',
  styleUrl: './dual-list-box.component.scss'
})
export class DualListBoxComponent implements OnInit, AfterViewInit {
  @ViewChild('selectRef', { static: true }) selectRef!: ElementRef<HTMLSelectElement>;
  dualListboxInstance: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser || typeof DualListbox === 'undefined') {
      return;
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initializeDualListbox();
    }
  }

  initializeDualListbox(): void {
    this.dualListboxInstance = new DualListbox(this.selectRef.nativeElement, {
      availableTitle: 'Available Items',
      selectedTitle: 'Selected Items',
      addButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-right"></i></button>',
      removeButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-left"></i></button>',
      addAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-right"></i></button>',
      removeAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-left"></i></button>',
      sortable: true,
      upButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-up"></i></button>',
      downButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-down"></i></button>',
      draggable: true,
      addEvent: (value: any) => console.log('Added:', value),
      removeEvent: (value: any) => console.log('Removed:', value),
    });

    setTimeout(() => this.addSearchIcons(), 500);
  }

  addSearchIcons(): void {
    document.querySelectorAll('.dual-listbox__search').forEach((input) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('search-input-wrapper');

      const icon = document.createElement('i');
      icon.classList.add('ph', 'ph-magnifying-glass', 'search-icon');

      input.parentNode?.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      wrapper.appendChild(icon);
    });
  }
}
