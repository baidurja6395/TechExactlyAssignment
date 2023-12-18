import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './Services/api.service';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './Services/form.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    ApiService,
    FormService,
  ],
  exports:[AngularMaterialModule,ReactiveFormsModule]
})
export class CoreModule { }
