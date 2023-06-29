import { HighestMileagePipe } from './highest-mileage.pipe';

describe('HighestMileagePipe', () => {
  let pipe: HighestMileagePipe;

  beforeEach(() => {
    pipe = new HighestMileagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter vehicles with car mileage less than or equal to input value', () => {
    const vehicles = [
      { id: 1, carMileage: 10000 },
      { id: 2, carMileage: 20000 },
      { id: 3, carMileage: 30000 },
    ];
    const filteredVehicles = pipe.transform(vehicles, 20000);
    expect(filteredVehicles.length).toEqual(2);
    expect(filteredVehicles).toContain(vehicles[0]);
    expect(filteredVehicles).toContain(vehicles[1]);
  });

  it('should return all vehicles when input value is undefined', () => {
    const vehicles = [
      { id: 1, carMileage: 10000 },
      { id: 2, carMileage: 20000 },
      { id: 3, carMileage: 30000 },
    ];
    const filteredVehicles = pipe.transform(vehicles, undefined);
    expect(filteredVehicles.length).toEqual(vehicles.length);
    expect(filteredVehicles).toEqual(vehicles);
  });
});
