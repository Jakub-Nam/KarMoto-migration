import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from '../../shared/interfaces/vehicle';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  selector: 'app-vehicle-selected',
  templateUrl: './vehicle-selected.component.html',
  styleUrls: ['./vehicle-selected.component.css']
})
export class VehicleSelectedComponent implements OnInit {
  vehicle?: Vehicle;
  vehicleURLs: string[] = [];
  timestamp?: number;

  constructor(
    private vehicleDbService: VehicleDbService,
    private route: ActivatedRoute,
    config: NgbCarouselConfig
  ) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    const timestamp: string | null = this.route.snapshot.paramMap.get('timestamp');
    const path: string = timestamp || '';
    this.fetchMainPhotoURL(path);
    this.fetchAdditionalPhotosURL(path);
  }

  fetchMainPhotoURL(path: string): void {
    this.vehicleDbService.fetchMainPhotoURL(path).subscribe({
      next: (vehicle: Vehicle) => {
       return this.vehicle = vehicle;
      },
      error: (e) => {
        console.log(e)
        window.alert('Wystąpił błąd podczas wczytywania danych');
      }
    })
  };

  fetchAdditionalPhotosURL(path: string): void {
    this.vehicleDbService.fetchAdditionalPhotosURL(path).subscribe({
      next: (arrURL: string[]) => {
        arrURL.forEach((url: string) => {
          this.vehicleURLs.push(url);
        })
      },
      error: e => {
        console.log(e)
        window.alert('Wystąpił błąd podczas wczytywania danych');
      }
    });
  }
}
