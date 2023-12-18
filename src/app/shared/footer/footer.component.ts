import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentDate:any;
constructor(){
  this.currentDate = new Date()
}

getCurrentyear(){
  return this.currentDate.getFullYear() 
}
}
