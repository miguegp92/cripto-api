import { Portfolio, Line } from './../../core/config/request.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/core/config/request.model';
import { Observable } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
      this.coins = this._dashboardService.get('coins');
      this.portfolios = this._dashboardService.get('portfolios');
      this.lines = this._dashboardService.get('lines');

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

    dialogRef.afterClosed().subscribe(() => {
      this.init();
    });

  }
}
