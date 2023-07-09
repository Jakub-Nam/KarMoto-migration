import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './list/vehicle-list.component';
import { VehicleSelectedComponent } from './vehicle-selected/vehicle-selected.component';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    VehicleListComponent,
    VehicleSelectedComponent
  ],
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void { }

}
