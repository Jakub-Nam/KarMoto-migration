import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleSelectedComponent } from './vehicle-selected.component';
import { of } from 'rxjs';

describe('VehicleSelectedComponent', () => {
    let component: VehicleSelectedComponent;
    let fixture: ComponentFixture<VehicleSelectedComponent>;
    let vehicleDbServiceSpy: jasmine.SpyObj<VehicleDbService>;

    beforeEach(() => {
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => '12345' // or any other id you want to use for testing
                }
            }
        };
        const vehicleDbServiceSpyObj = jasmine.createSpyObj('VehicleDbService', [
            'fetchMainPhoto',
            'fetchAdditionalVehiclePhotos'
        ]);
        TestBed.configureTestingModule({
            declarations: [VehicleSelectedComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteStub
                },
                NgbCarouselConfig,
                {
                    provide: VehicleDbService,
                    useValue: vehicleDbServiceSpyObj
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(VehicleSelectedComponent);
        component = fixture.componentInstance;
        vehicleDbServiceSpy = TestBed.inject(VehicleDbService) as jasmine.SpyObj<VehicleDbService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch main photo', () => {
        const mockVehicle: Vehicle = {
            brand: 'Toyota',
            carMileage: 1000,
            name: 'T-500',
            path: './',
            downloadURL: "",
            price: 5,
            timestamp: 15
        };
        vehicleDbServiceSpy.fetchMainPhoto.and.returnValue(of(mockVehicle));
        component.fetchMainPhoto('12345');
        expect(component.vehicle).toEqual(mockVehicle);
        expect(vehicleDbServiceSpy.fetchMainPhoto).toHaveBeenCalledWith('12345');
    });

    it('should fetch additional vehicle photos', () => {
        const mockResponse: Array<{ downloadURL: string; payload: string; }> = [{ downloadURL: 'somePath', payload: 'someData'}];
        vehicleDbServiceSpy.fetchAdditionalVehiclePhotos.and.returnValue(of(mockResponse));
        component.fetchAdditionalVehiclePhotos('somePath1');
        expect(component.vehicleURLs).toEqual(mockResponse);
        expect(vehicleDbServiceSpy.fetchAdditionalVehiclePhotos).toHaveBeenCalledWith('somePath1');
    });

});
