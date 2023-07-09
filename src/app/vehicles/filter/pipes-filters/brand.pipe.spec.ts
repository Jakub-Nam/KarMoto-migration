import { BrandPipe } from './brand.pipe';

describe('BrandPipe', () => {
  let pipe: BrandPipe;

  beforeEach(() => {
    pipe = new BrandPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter vehicles with brand equal to input value', () => {
    const vehicles = [
      { id: 1, brand: 'Toyota' },
      { id: 2, brand: 'BWM' },
      { id: 3, brand: 'Opel' },
    ];
    const filteredVehicles = pipe.transform(vehicles, 'BWM');
    expect(filteredVehicles.length).toEqual(1);
    expect(filteredVehicles).toContain(vehicles[1]);
  });

  it('should return all vehicles when input value is undefined', () => {
    const vehicles = [
      { id: 1, brand: 'Toyota' },
      { id: 2, brand: 'BWM' },
      { id: 3, brand: 'Opel' },
    ];
    const filteredVehicles = pipe.transform(vehicles, undefined);
    expect(filteredVehicles.length).toEqual(vehicles.length);
    expect(filteredVehicles).toEqual(vehicles);
  });
});
