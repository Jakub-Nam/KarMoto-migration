export class User {
    constructor(
        public email: string,
        public password: string,
        public id: string | null,
        public _token: string,
        public _tokenExpirationDate: Date | null
    ) { }
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}



