import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/Services/api.service';
import { FormService } from 'src/app/Services/form.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  signupForm:FormGroup|undefined;
  showPassWord:boolean = false;
  showConfPassWord:boolean = false;
  constructor(
    private fb:FormBuilder,
    private formService:FormService,
    private api:ApiService,
  ){
    this.createFormGroup()
  }
  ngOnInit(): void {
  }

  createFormGroup(){
    this.signupForm = this.fb.group({
      type:['login'],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confPassword:['',Validators.required]
    })
  }

  togelPass(){
    this.showPassWord = !this.showPassWord;
  }
  togelConfPass(){
    this.showConfPassWord = !this.showConfPassWord;
  }

  async Login(){
    if(this.signupForm){
      this.formService.markFormGroupTouched(this.signupForm)
      if(this.signupForm.valid){
        await this.api.post(this.signupForm)
        .then(async (res: any) => {
           console.log(res)
        })
        .catch((err: any) => {
        })
      }
    }
  }

  

}
