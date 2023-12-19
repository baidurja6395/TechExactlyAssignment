import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from 'src/app/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { ValidationMessageModule } from 'src/app/shared/validation-message/validation-message/validation-message.module';



@NgModule({
  declarations: [LoginComponent,RegistrationComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule,
    SharedModule,
    ValidationMessageModule
  ]
})
export class LoginModule { }
