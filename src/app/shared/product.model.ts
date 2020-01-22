export class Product {
    constructor(
        public img: string,
        public name: string,
        public color: string,
        public size: string,
        public price: number,
        public qty?: number
    ) {}
}