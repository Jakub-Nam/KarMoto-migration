import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

const angularMaterial = [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule
];

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective

    ],
    imports: [
        angularMaterial,
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        AlertComponent,
        angularMaterial,
        CommonModule,
        FontAwesomeModule,
        PlaceholderDirective
    ]

})
export class SharedModule { }
