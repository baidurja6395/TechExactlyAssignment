import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { FormService } from 'src/app/Services/form.service';
import { APIKEY, EMAIL, PASSWORD } from 'src/app/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  showPassWord: boolean = false;
  rememberMe: boolean = false;
  errorMsg: any = {};
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private api: ApiService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.createFormGroup()
    this.createMsg()
  }
  ngOnInit(): void {
    this.getlocalData()
  }

  async getlocalData() {
    const email = localStorage.getItem(EMAIL)
    const password = localStorage.getItem(PASSWORD)
    if (email && password) {
      this.loginForm?.get('email')?.setValue(email)
      this.loginForm?.get('password')?.setValue(password)
    }
  }

  rememberMeClick() {
    this.rememberMe = !this.rememberMe;
  }

  togelPass() {
    this.showPassWord = !this.showPassWord;
  }

  async Login() {
    if (this.loginForm) {
      this.formService.markFormGroupTouched(this.loginForm)
      if (this.loginForm.valid) {
        await this.api.post(this.loginForm.getRawValue())
          .then(async (res: any) => {
            if(res.success){
              this.toastr.success(res.message)
              if (this.rememberMe) {
                localStorage.setItem(EMAIL, this.loginForm?.getRawValue().email)
                localStorage.setItem(PASSWORD, this.loginForm?.getRawValue().password)
              } else {
                localStorage.removeItem(EMAIL)
                localStorage.removeItem(PASSWORD)
              }
              localStorage.setItem(APIKEY, res.data.password)
              this.router.navigate(['home'])
            }else{
              this.toastr.error(res.message)
            }
            
          })
          .catch((err: any) => {
            this.toastr.error('Login faild deu to some error')
          })
      }
    }
  }

  createFormGroup() {
    this.loginForm = this.fb.group({
      type: ['login'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createMsg() {
    this.errorMsg = {
      email: {
        required: 'Email is required',
        email: 'Email in not Valid'
      },
      password: {
        required: 'Password is required'
      }
    }
  }

}
