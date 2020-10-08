import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl: string = "http://localhost:3000/user";
  //baseurl: string = "http://localhost:8080/serverUser";

  constructor(private httpClient : HttpClient) { }

  login(userLogin: any) {
    return this.httpClient.post(this.baseurl+'/login',userLogin);
  }

  register(userRegister: any) {
    this.httpClient.post(this.baseurl+'/register',userRegister).subscribe(
      res => {
        console.log(res);
       // event.confirm.resolve(event.newData);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });

  }
}