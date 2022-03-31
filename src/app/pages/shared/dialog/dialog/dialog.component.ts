import { DialogService } from './dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  mode: string = '';
  dataContext: any = undefined;
  path: string = '';

  itemForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogService: DialogService, private spinner: SpinnerService,
    private notification: NotificationService
  ) {
    this.mode = this.data.mode;
    this.dataContext = this.data.data;
    this.path = this.data.path;
  }

  ngOnInit(): void {
    if (this.path === 'coins') {
      this.itemForm.addControl('acronym', new FormControl(''));
    }

    if (this.mode === 'edit') {
      this.itemForm.setValue(this.dataContext)
    }
  }

  postItem() {

    this._dialogService.postMethod(this.path, this.itemForm.value).subscribe(
      {
        next: (data: any) => this.notification.showNotificationSuccess(),
        error: (e: any) => this.notification.showNotificationError(),
        complete: () => this.close()
      });
  }

  updateItem() {
    this._dialogService.putMethod(`${this.path}/${this.dataContext.id}`, this.itemForm.value).subscribe(
      {
        next: (data: any) => this.notification.showNotificationSuccess(),
        error: (e: any) => this.notification.showNotificationError(),
        complete: () => this.close()
      });
  }

  deleteItem() {
    this._dialogService.deleteMethod(`${this.path}/${this.dataContext.id}`).subscribe(
      {
        next: (data: any) => this.notification.showNotificationSuccess(),
        error: (e: any) => this.notification.showNotificationError(),
        complete: () => this.close()
      });
  }

  close(): void {

    this.dialogRef.close(this.path);
  }

}
