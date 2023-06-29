import { HighestPricePipe } from './highest-price.pipe';

describe('HighestPricePipe', () => {
  let pipe: HighestPricePipe;

  beforeEach(() => {
    pipe = new HighestPricePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter vehicles with price less than or equal to input value', () => {
    const vehicles = [
      { id: 1, price: 10000 },
      { id: 2, price: 20000 },
      { id: 3, price: 30000 },
    ];
    const filteredVehicles = pipe.transform(vehicles, 20000);
    expect(filteredVehicles.length).toEqual(2);
    expect(filteredVehicles).toContain(vehicles[0]);
    expect(filteredVehicles).toContain(vehicles[1]);
  });

  it('should return all vehicles when input value is undefined', () => {
    const vehicles = [
      { id: 1, price: 10000 },
      { id: 2, price: 20000 },
      { id: 3, price: 30000 },
    ];
    const filteredVehicles = pipe.transform(vehicles, undefined);
    expect(filteredVehicles.length).toEqual(vehicles.length);
    expect(filteredVehicles).toEqual(vehicles);
  });
});
