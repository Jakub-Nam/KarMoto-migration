import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })

export class AuthService {

    emptyUser: User = {
        email: '',
        password: '',
        id: '',
        _token: '',
        _tokenExpirationDate: null,

        get token() {
            if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
                return null;
            }
            return this._token;
        }
    };
    
    user = new BehaviorSubject<User>(this.emptyUser);

    constructor(
        public afAuth: AngularFireAuth
    ) { }

    login(email: string, password: string): Promise<any | undefined>  {

        if (email !== undefined) {
            return this.afAuth.signInWithEmailAndPassword(email, password);
        }

        return this.login(email, password);
    }

    autoLogin() {
        const localStorageData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (localStorageData) {
            const userData: {
                email: string;
                password: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData') || '{}');

            if (!userData) {
                return;
            }

            const loadedUser = new User(
                userData.email,
                userData.password,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
            if (loadedUser.token) {
                this.user.next(loadedUser);
            }
            this.login(userData.email, userData.password);
        } else {
            return;
        }
    }

    logout() {
        this.user.next(this.emptyUser);
        this.afAuth.signOut();
        localStorage.clear();
    }
}
