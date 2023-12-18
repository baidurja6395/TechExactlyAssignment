import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { FormService } from 'src/app/Services/form.service';
import { APIKEY, EMAIL, PASSWORD } from 'src/app/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup|undefined;
  showPassWord:boolean = false;
  rememberMe:boolean = false;
  constructor(
    private fb:FormBuilder,
    private formService:FormService,
    private api:ApiService,
    private router: Router
  ){
    this.createFormGroup()
  }
  ngOnInit(): void {
    this.getlocalData()
  }

  async getlocalData(){
    const email = localStorage.getItem(EMAIL)
    const password = localStorage.getItem(PASSWORD)
    if(email && password){
      this.loginForm?.get('email')?.setValue(email)
      this.loginForm?.get('password')?.setValue(password)
    }
  }

  rememberMeClick(){
    this.rememberMe = !this.rememberMe;
  }

  createFormGroup(){
    this.loginForm = this.fb.group({
      type:['login'],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  togelPass(){
    this.showPassWord = !this.showPassWord;
  }

  async Login(){
    if(this.loginForm){
      this.formService.markFormGroupTouched(this.loginForm)
      if(this.loginForm.valid){
        if(this.rememberMe){
        localStorage.setItem(EMAIL,this.loginForm?.getRawValue().email)
        localStorage.setItem(PASSWORD,this.loginForm?.getRawValue().password)
        }else{
          localStorage.removeItem(EMAIL)
          localStorage.removeItem(PASSWORD)
        }
        localStorage.setItem(APIKEY,'abcd')
        this.router.navigate(['home'])
        // await this.api.post(this.loginForm.getRawValue())
        // .then(async (res: any) => {
          
        //    console.log(res)
        // })
        // .catch((err: any) => {
        // })
      }
    }
  }

}
