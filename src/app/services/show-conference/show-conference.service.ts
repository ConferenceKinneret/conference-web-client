import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowConferenceService {
  baseurl: string = "http://localhost:3000/show";

  constructor(private httpClient : HttpClient) { }

  getAllConferences() {
    return this.httpClient.post(this.baseurl+'/conference',{
      'email': localStorage.getItem('email')
    });
  }

  getLectures(conferenceName: string) {
    return this.httpClient.post(this.baseurl+'/lectures',{
      'conferenceName': conferenceName
    });
  }

  getSessions(conferenceName: string) {
    return this.httpClient.post(this.baseurl+'/sessions',{
      'conferenceName': conferenceName
    });
  }

  deleteLecture(lectureName: string) {
    this.httpClient.post(this.baseurl+'/deleteLecture',{
      'lectureName': lectureName,
    }).subscribe(
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

  deleteSession(sessionName: string) {
    this.httpClient.post(this.baseurl+'/deleteSession',{
      'sessionName': sessionName,
    }).subscribe(
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

  updatePublish(conferenceName: string) {
    this.httpClient.post(this.baseurl+'/updatePublish',{
      'conferenceName': conferenceName,
    }).subscribe(
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
