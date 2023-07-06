import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { VehicleDbService } from '../../shared/vehicle-db.service';
import { VehicleListComponent } from './vehicle-list.component';

describe('VehicleListComponent', () => {
    let component: VehicleListComponent;
    let fixture: ComponentFixture<VehicleListComponent>;
    let vehicleDbService: VehicleDbService;
    let authService: AuthService;

    beforeEach(async () => {
        const vehicleDbServiceSpy = jasmine.createSpyObj('VehicleDbService', ['fetchAllVehicles']);
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
        await TestBed.configureTestingModule({
            declarations: [VehicleListComponent],
            providers: [
                { provide: VehicleDbService, useValue: vehicleDbServiceSpy },
                { provide: AuthService, useValue: authServiceSpy },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { queryParams: { id: '1' } } }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleListComponent);
        component = fixture.componentInstance;
        vehicleDbService = TestBed.inject(VehicleDbService);
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
    });
});