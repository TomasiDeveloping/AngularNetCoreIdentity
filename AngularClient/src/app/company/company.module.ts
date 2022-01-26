import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {CompaniesComponent} from "./companies/companies.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'companies', component: CompaniesComponent}
    ])
  ]
})
export class CompanyModule { }
