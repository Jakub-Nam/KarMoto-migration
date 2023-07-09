import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Filter } from './filter.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, DoCheck {
  @Output() filtered = new EventEmitter<Filter>();

  brandModel!: string;
  lowestPrice!: number;
  highestPrice!: number;
  lowestMileage!: number;
  highestMileage!: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    const formValues: Filter = {
      brand: this.brandModel,
      priceLow: this.lowestPrice,
      highestPrice: this.highestPrice,
      lowestMileage: this.lowestMileage,
      highestMileage: this.highestMileage
    };
    this.filtered.emit(formValues);
  }
}
