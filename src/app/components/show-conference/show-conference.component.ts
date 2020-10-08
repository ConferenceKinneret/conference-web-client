import { Component, OnInit } from '@angular/core';
import { ShowConferenceService } from 'src/app/services/show-conference/show-conference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-conference',
  templateUrl: './show-conference.component.html',
  styleUrls: ['./show-conference.component.scss']
})
export class ShowConferenceComponent implements OnInit {

  conferences: object;
  constructor(private showConferenceServices: ShowConferenceService, 
    private router: Router) { }

  ngOnInit() {
    this.showConferenceServices.getAllConferences().subscribe(result => {
      this.conferences = result;
      console.log(result);
    });
  }

  moveToEdit(conferenceName: string) {
    this.router.navigate(['/edit',{'conferenceName': conferenceName}])
  }

}
