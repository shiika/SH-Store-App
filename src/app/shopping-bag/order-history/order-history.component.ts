import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderInfo } from 'src/app/shared/orderInfo.model';
import { DataService } from 'src/app/shared/data.service';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: OrderInfo[] = [];
  userName: string;
  $fetchSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUserInfo()
      .subscribe((user: UserInfo) => this.userName = user.firstName);
    this.$fetchSub = this.dataService.fetchOrders()
      .subscribe(
        orders => {
          this.orders = orders;
        }
      )
  }

  ngOnDestroy():void {
    this.$fetchSub.unsubscribe();
  }

}
