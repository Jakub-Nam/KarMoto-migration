import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';

@Pipe({
  standalone: true,
  name: 'LowestPrice'
})
export class LowestPricePipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle: Vehicle) => {
      return vehicle.price >= inputFilterValue;
    });
  }
}
