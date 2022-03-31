import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailService } from './detail.service';
import { DetailComponent } from './detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {
    path: '',
    component: DetailComponent
  }
];

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule, 
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  providers: [DetailService],
  exports: [RouterModule, DetailComponent]
})
export class DetailModule { }
