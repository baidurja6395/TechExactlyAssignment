import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  weatherDetails:any;
  weatherPopup:boolean = false;
    constructor(
      private api:ApiService
    ){

    }
  ngOnInit(): void {
    this.getWeatherReport()
  }

  async getWeatherReport(){
    this.api.get('http://api.weatherapi.com/v1/current.json?key=07b74907b4084b598cb171457231812&q=India&aqi=no')
    .then(res=>{
      this.weatherDetails = res;
    }).catch((err:any)=>{

    })
  }

  openWeatherPopup(){
    this.weatherPopup = true;
  }
  closeWeatherPopup(){
    this.weatherPopup = false;
  }

  tempSnoworHigh(data:number){
    if(data>20){
      return true
    }
    return false
  }

}
