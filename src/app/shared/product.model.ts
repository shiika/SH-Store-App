export class Product {
    constructor(
        public img: string,
        public name: string,
        public color: string,
        public size: string,
        public price: number,
        public id: number,
        public gender: string,
        public category: string,
        public qty?: number
    ) {}

}