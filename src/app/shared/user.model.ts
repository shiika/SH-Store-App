export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public username?: string
    ) {}

    get token() {
        if (new Date() > this._tokenExpirationDate) {
            return this._token;
        }
    }
}