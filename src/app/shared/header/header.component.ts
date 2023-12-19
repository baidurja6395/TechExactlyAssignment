import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/Services/form.service';
import { APIKEY } from 'src/app/constants/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  contactusPopup:boolean = false;
  contactusForm:FormGroup|undefined;
  isLogin:boolean=false;
  errorMsg:any={}
  constructor(
    private router:Router,
    private fb:FormBuilder,
    private formService:FormService,
  ){
    this.createFormGroup()
    this.createMsg()
    if(localStorage.getItem(APIKEY)){
      this.isLogin = true
    }
  }
  ngOnInit(): void {
  }

  dashboardClick(){
    this.router.navigate(['/home'])
  }
  movieClick(){
    this.router.navigate(['/home/movies'])
  }
  logout(){
    localStorage.removeItem(APIKEY)
    this.router.navigate([''])
  }
  openContactusPopup(){
    this.contactusPopup = true;
  }
  closeContactusPopup(){
    this.contactusPopup = false;
  }

  submitContactUsForm(){
    if(this.contactusForm){
      this.formService.markFormGroupTouched(this.contactusForm)
      if(this.contactusForm.valid)(
        window.open('https://techexactly.com.','_blank')
      )
    }
  }

  createFormGroup(){
    this.contactusForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contactnumber:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    })
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
      contactnumber:{
        required: 'Contact number is required',
        minLength:'Enter valid contact number',
        maxLength:'Enter valid contact number',
      }
    }
  }

}
