import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  errorMsg:any={};
  confPassErrmsg:string=''
  constructor(
    private fb:FormBuilder,
    private formService:FormService,
    private api:ApiService,
    private toastr:ToastrService,
    private router: Router,
  ){
    this.createFormGroup()
    this.createMsg()
  }
  ngOnInit(): void {
    this.signupForm?.get('password')?.valueChanges.subscribe(res=>{
      if(res && res.length){
        this.confPassErrmsg =''
      }
    })
    this.signupForm?.get('confPassword')?.valueChanges.subscribe(res=>{
      if(res && res.length){
        this.confPassErrmsg =''
      }
    })
  }

  createFormGroup(){
    this.signupForm = this.fb.group({
      type:['register'],
      email:['',[Validators.required,Validators.email]],
      name:['',Validators.required],
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

  async signup(){
    if(this.signupForm){
      this.formService.markFormGroupTouched(this.signupForm)
      if(this.signupForm.valid){
        if(this.signupForm.value.password === this.signupForm.value.confPassword){
          const data ={
            type:this.signupForm.value.type,
            email:this.signupForm.value.email,
            name:this.signupForm.value.name,
            password:this.signupForm.value.password,
            
          }
          await this.api.post(data)
          .then(async (res: any) => {
            if(res.success){
              this.toastr.success(res.message)
              this.router.navigate([''])
            }else{
              this.toastr.error(res.message)
            }
          })
          .catch((err: any) => {
            this.toastr.error('Registration faild deu to some error')
          })
        }else{
          this.confPassErrmsg = 'Password not matched'
        }
        
      }
    }
  }

  createMsg() {
    this.errorMsg = {
      email: {
        required: 'Email is required',
        email: 'Email in not Valid'
      },
      name: {
        required: 'Name is required'
      },
      password: {
        required: 'Password is required'
      },
      confPassword:{
        required: 'Confirm password is required'
      }
    }
  }

  

}
