import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = "https://navkiraninfotech.com/test_api/index.php";
  constructor(
    private http: HttpClient,
  ) { }

  async post(obj:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return new Promise(async( resolve ,reject)=>{
      const success = (res: any) => {
        resolve(res);
      };
    const error = (err: any) => {
        reject(err);
      };
      const data = new FormData()
      for ( var key in obj ) {
        data.append(key, obj[key]);
    }
    return this.http.post<any>(`${this.BASE_URL}`, data)
      .subscribe(success, error);
    })
  }
  async get(url:any,isBearerToken?:boolean){
    return new Promise(async( resolve ,reject)=>{
      const success = (res: any) => {
        resolve(res);
      };
    const error = (err: any) => {
        reject(err);
      };
      const headers = new HttpHeaders();
      if(isBearerToken){
        headers.append('Bearer','fcc54c057bbb2ec7963d38be9d190f49')
      }
    return this.http.get<any>(url)
      .subscribe(success, error);
    })
  }
}
