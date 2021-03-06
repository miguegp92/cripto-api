import { Portfolio, Line } from './../../core/config/request.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/core/config/request.model';
import { Observable } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // coins: Array<Coin> = [];
  coins: Observable<Coin[]> | undefined;

  portfolios: Observable<Portfolio[]> | undefined;
  lines: Observable<Line[]> | undefined;

  constructor(
    public dialog: MatDialog,
    private _dashboardService: DashboardService, private spinner: SpinnerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init(){
      this.spinner.toggle(true);
      this.coins = this._dashboardService.get('coins');
      this.portfolios = this._dashboardService.get('portfolios');
      // this.lines = this._dashboardService.get('lines');
      this.spinner.toggle(false);
  }

  reload(path: string){
    const launch: any = {
      'coins': () => this.coins = this._dashboardService.get('coins'),
      'portfolios': () =>  this.portfolios = this._dashboardService.get('portfolios'),
      'lines': () =>  this.lines = this._dashboardService.get('lines'),
    }
    return launch[path]();
  }

  getTypeStore(type: string){
    return this._dashboardService.getStore(type)
  }

  addCoin(){
    this.openDialog('add','coins');
  }

  addPortFolio(){
    this.openDialog('add','portfolios');
  }

  editPortfolio(item: Portfolio){
    this.openDialog('edit', 'portfolios',item);
  }

  editCoin(coin: Coin){
    this.openDialog('edit', 'coins',coin);
  }

  deletePortFolio(item: Portfolio){
    
    this.openDialog('delete', 'portfolios', item);
  }

  deleteCoin(coin: Coin){
    
    this.openDialog('delete', 'coins', coin);
  }

  openDialog(mode: string, path: string, context?: any) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {mode: mode, path: path, data: context || null}});

    dialogRef.afterClosed().subscribe( (init) => {
      this.spinner.toggle(true);
      this.reload(init);
      this.spinner.toggle(false);
    });

  }
}
