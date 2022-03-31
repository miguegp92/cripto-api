import { NotificationService } from './core/services/notification.service';
import { SpinnerService } from './core/services/spinner.service';
import { environment } from './../environments/environment';
import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('templateSnack') divSnack!: TemplateRef<any>;
  title = environment.title;
  api = environment.apiURL;
  messagesSnack: Array<string> = [];

  constructor(
    public spinner: SpinnerService,
    private notification: NotificationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notification.launch.subscribe(configSnack => {
      this.messagesSnack = configSnack.messages;
      this.openSnackBar(configSnack.temp)
    })
  }

  openSnackBar(temp: number = 5) {
    const snack = this._snackBar.openFromTemplate(this.divSnack, {
      duration: temp * 1000,
    });

    snack.afterDismissed().subscribe(() => {
      this.messagesSnack = [];
    })
  }

}
