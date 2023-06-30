import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    canActivate(): boolean {

        const userData: {
            email: string;
            password: string;
            id: string;
            _token: string;
            _tokenExpirationDate: Date;
        } = JSON.parse(localStorage.getItem('userData') || '{}');

        const expirationTime: Date = new Date(userData._tokenExpirationDate);

        if (expirationTime.getSeconds() < expirationTime.getSeconds() + 1800) {
            return true;
        } else {
            return false;
        }
    }
}
