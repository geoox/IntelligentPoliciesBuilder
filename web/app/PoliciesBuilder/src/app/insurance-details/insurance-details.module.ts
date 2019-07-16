import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InsuranceDetailsPage } from './insurance-details.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsuranceDetailsPage]
})
export class InsuranceDetailsPageModule {}
