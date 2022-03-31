import { Coin, Line, Portfolio } from './../../core/config/request.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { DetailService } from './detail.service';
import { concatMap, Observable, switchMap, mergeMap, catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog/dialog.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: number = 0;
  item: Observable<Portfolio> | undefined = undefined;
  lines: Observable<any> | undefined = undefined;
  values: Array<any> = []
  coinsToAdd: Array<Coin> = []
  toogleFormAddCoin: boolean = false;
  coinSelected: any = 0;
  coinAmount: number = 0;
  constructor(public dialog: MatDialog, private _detailService: DetailService, private _dashboardService: DashboardService, private route: ActivatedRoute, private spinner: SpinnerService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.item = this._detailService.getData('portfolios', this.id);
    this.reloadLines()
    this._dashboardService.get('coins').subscribe(coins =>
      this.coinsToAdd = coins
    );
  }

  getValueCoin() {
    this.lines?.subscribe(coins => {
      this.values = coins.reduce((prices: any, coin: any) => {
        this._dashboardService.getCoinValue(coin.acronym).subscribe(value => prices[coin.acronym] = value)
        return prices
      }, {})
    })
  }
  goBack() {
    window.history.back();
  }

  addLine() {
    this.spinner.toggle(true);
    const line = {
      portfolioId: this.id,
      coinId: this.coinSelected,
      amount: this.coinAmount
    }
    this._detailService.postsData(line).subscribe(response => {
      this.spinner.toggle(false);
      this.notification.showNotificationSuccess()
      this.toogleFormAddCoin = false;
      this.coinSelected = 0;
      this.coinAmount = 0;
      this.reloadLines()
    }, (e: any) => {
      this.spinner.toggle(false);
      this.notification.showNotificationError()
    });

  }


  deleteLine(item: any) {

    this.openDialog('delete', 'lines', item);
  }

  openDialog(mode: string, path: string, context?: any) {
    const dialogRef = this.dialog.open(DialogComponent, { data: { mode: mode, path: path, data: context || null } });

    dialogRef.afterClosed().subscribe((init) => {
      this.reloadLines()
    });

  }

   private async reloadLines() {
    this.spinner.toggle(true);
    this.lines = this._detailService.getLines(this.id);
    this.getValueCoin()
    this.spinner.toggle(false);
  }
}
