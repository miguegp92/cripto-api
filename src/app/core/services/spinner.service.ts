import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  showSpinner: boolean = false;
 
  toggle( state: boolean) {
    this.showSpinner = state;
  }

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }

  setTemp(ms: number, callback: void){
    setTimeout( () => callback, ms);
  }
}
