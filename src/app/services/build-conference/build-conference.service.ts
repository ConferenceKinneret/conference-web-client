import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildConferenceService {
  baseurl: string = "http://localhost:3000/build";
  //baseurl: string = "serverBuild";

  constructor(private httpClient : HttpClient) { }

  /**
   * save the conference details
   * @param conferenceDetails 
   */
  saveConferenceDetails(conferenceDetails: object) {
    console.log("conference:")
    console.log(conferenceDetails);
    
    this.httpClient.post(this.baseurl+'/addConference',{
      'conference': conferenceDetails,
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
  } // end saveConferenceDetails()

  /**
   * saving the lectures details
   * @param lecturesDetails 
   */
  saveLecturesDetails( lecturesDetails: object, conferenceName: string) {
    console.log("Lectures:")
    console.log(lecturesDetails);

    this.httpClient.post(this.baseurl+'/addLectures',{
      'lecture': lecturesDetails,
      'conferenceName': conferenceName
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
  } // end saveLecturesDetails()

  /**
   * saving the sessions details
   * @param sessionsDetails 
   */
  saveSessionssDetails( sessionsDetails: object, conferenceName: string) {
    console.log("sessions:")
    console.log(sessionsDetails);

    this.httpClient.post(this.baseurl+'/addsessions',{
      'session': sessionsDetails,
      'conferenceName': conferenceName
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
  } // end saveSessionssDetails()

   /**
   * saving the sessions details
   * @param sessionsDetails 
   */
  saveBreaksDetails( breaksDetails: object, conferenceName: string) {
    console.log("sessions:")
    console.log(breaksDetails);

    this.httpClient.post(this.baseurl+'/addbreaks',{
      'break': breaksDetails,
      'conferenceName': conferenceName
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
  } // end saveBreaksDetails()
}
