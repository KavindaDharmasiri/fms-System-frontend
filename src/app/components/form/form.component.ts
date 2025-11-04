import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  hide = true;

  dateTime: any;
  selected: any;
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor() {
    this.initializeYears();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 74; i <= currentYear + 76; i++) {
      this.years.push(i);
    }
  }

  // dropdown
  dropdownSingal = 'option2';

  pokemonControl = new FormControl('');
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
        { value: 'oddish-1', viewValue: 'Oddish' },
        { value: 'bellsprout-2', viewValue: 'Bellsprout' },
      ],
    },
    {
      name: 'Water',
      pokemon: [
        { value: 'squirtle-3', viewValue: 'Squirtle' },
        { value: 'psyduck-4', viewValue: 'Psyduck' },
        { value: 'horsea-5', viewValue: 'Horsea' },
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        { value: 'charmander-6', viewValue: 'Charmander' },
        { value: 'vulpix-7', viewValue: 'Vulpix' },
        { value: 'flareon-8', viewValue: 'Flareon' },
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ],
    },
  ];

  // Chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [{ name: 'Lemon' }];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  // slider
  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  // Uploader
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
