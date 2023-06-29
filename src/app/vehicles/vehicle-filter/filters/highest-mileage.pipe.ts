import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';

@Pipe({
  name: 'highestMileage'
})
export class HighestMileagePipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (!inputFilterValue) {
      return vehicles;
    }

    return vehicles.filter((vehicle: Vehicle) => {
      return vehicle.carMileage <= inputFilterValue;
    });
  }
}
