import { Product } from './product.model';

export class OrderInfo {
    constructor(
        public deliveryMethod: string,
        public firstName: string,
        public lastName: string,
        public city: string,
        public address: string,
        public phoneno: number,
        public email: string,
        public products: Product[],
        public id: number,
        public totalAmount: number,
        public orderDate: Date,
        public shipDate: Date
    ) {
    }

    
}