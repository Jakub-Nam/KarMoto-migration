import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    VehicleListComponent,
  ],
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void { }

}
