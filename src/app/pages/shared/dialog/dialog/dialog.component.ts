import { DialogService } from './dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  mode: string = '';
  dataContext: any = undefined;
  path: string = '';

  // itemForm = new FormGroup({
  //   id: new FormControl(''),
  //   name: new FormControl(''),
  //   acronym: new FormControl(''),
  // });

  itemForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogService: DialogService
  ) {
    this.mode = this.data.mode;
    this.dataContext = this.data.data;
    this.path = this.data.path;
  }

  ngOnInit(): void {
    debugger;
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

        next: (data: any) => console.log(data),
        error: (e: any) => console.error(e),
        complete: () => this.close(this.itemForm.value)
      });
  }

  updateItem() {
    this._dialogService.putMethod(`${this.path}/${this.dataContext.id}`, this.itemForm.value).subscribe(
      {
        next: (data: any) => console.log(data),
        error: (e: any) => console.error(e),
        complete: () => this.close(this.itemForm.value)
      });
  }

  deleteItem() {
    this._dialogService.deleteMethod(`${this.path}/${this.dataContext.id}`).subscribe(
      {
        next: (data: any) => console.log(data),
        error: (e: any) => console.error(e),
        complete: () => this.close([])
      });
  }

  close(response: any): void {

    this.dialogRef.close(response);
  }

}
