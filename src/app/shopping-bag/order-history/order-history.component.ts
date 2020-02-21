import { Component, OnInit } from '@angular/core';
import { OrderInfo } from 'src/app/shared/orderInfo.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderInfo[] = [];
  userName: string = this.dataService.user.username.split(" ")[0];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchOrders()
      .subscribe(
        orders => {
          this.orders = orders;
        }
      )
  }

}
