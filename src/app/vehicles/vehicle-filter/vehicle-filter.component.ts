import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Filter } from './filter.model';

@Component({
  selector: 'app-vehicle-filter',
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.css']
})

export class VehicleFilterComponent implements OnInit, DoCheck {
  @Output() filtered = new EventEmitter<object>();

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
