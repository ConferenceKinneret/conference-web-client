import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowConferenceService } from 'src/app/services/show-conference/show-conference.service';
import { BuildConferenceService } from 'src/app/services/build-conference/build-conference.service';

@Component({
  selector: 'app-edit-conference',
  templateUrl: './edit-conference.component.html',
  styleUrls: ['./edit-conference.component.scss']
})
export class EditConferenceComponent implements OnInit {

  editLectureForm: FormGroup; // conference and lecture controls and data
  conferenceName: string;
  lectures: object;
  sessions: object;
  allLecturesDetails = new Array(); // lectures data
  allAuthorsDetails = new Array(); // authors data
  allSessionssDetails = new Array(); // sessions data
  allBreaksDetails = new Array(); // breaks data

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private showConferenceServices: ShowConferenceService,
    private saveDataToDatabase: BuildConferenceService) { }

  ngOnInit() {
     // create the controls of the form array
     this.editLectureForm = this.fb.group({
      sessions: this.fb.array([this.addSessionFormGroup()]),
      lectures: this.fb.array([this.addLectureFormGroup()]),
      breaks: this.fb.array([this.addBreakFormGroup()])
    });
    this.conferenceName = this.route.snapshot.paramMap.get('conferenceName');

    this.showConferenceServices.getLectures(this.conferenceName).subscribe(result => {
      this.lectures = result;
      console.log(result);
    });

    this.showConferenceServices.getSessions(this.conferenceName).subscribe(result => {
      this.sessions = result;
      console.log(result);
    });
  }

   /**
   * create the session controls
   */
  addSessionFormGroup() {
    return this.fb.group({
      sessionName: [''],
      sessionCategory: [''],
      sessionLocation: [''],
      sessionLead: [''],
    });
  } // end addSessionFormGroup()

  /**
   * create the lecture controls
   */
  addLectureFormGroup() {
    return this.fb.group({
      lectureName: ['', Validators.required],
      lectureStartTime: ['', Validators.required],
      lectureEndTime: ['', Validators.required],
      lectureDescription: [''],
      lectureClass: ['', Validators.required],
      lectureFile: [''],
      lectureSession: [''],
      authors: this.fb.array([this.addAuthorFormGroup()])
    });
  } // end addLectureFormGroup()

  /**
   * create the lecturer controls
   */
  addAuthorFormGroup() {
    return this.fb.group({
      authorName: [''],
      authorCompany: [''],
      authorRole: [''],
      authorImage: [''],
      authorCV: [''],
      isLecturer:['']
    })
  } // end addAuthorFormGroup()

  /**
   * create the breaks controls
   */
  addBreakFormGroup() {
    return this.fb.group({
      breakName: [''],
      breakStartTime: [''],
      breakEndTime: [''],
    });
  } // end addBreakFormGroup()

   /**
   * adding new session controls 
   */
  addNewSession() {
    (<FormArray>this.editLectureForm.get('sessions')).push(this.addSessionFormGroup());
  } // end addNewSession()

  /**
   * adding new lecture controls 
   */
  addNewLecture() {
    (<FormArray>this.editLectureForm.get('lectures')).push(this.addLectureFormGroup());
  } // end addNewLecture()

  /**
   * adding new lecture controls 
   */
  addNewAuthor(authorIndex: number) {
    (<FormArray>this.editLectureForm.get('lectures').get([authorIndex]).get('authors')).push(this.addAuthorFormGroup());
  } // end addNewAuthor()

  /**
   * adding new break controls 
   */
  addNewBreak() {
    (<FormArray>this.editLectureForm.get('breaks')).push(this.addBreakFormGroup());
  } // end addNewSession()

  /**
   * delete lecture from the form and the formArray
   * @param lectureIndex 
   */
  removeLecture(lectureIndex: number) {
    (<FormArray>this.editLectureForm.get('lectures')).removeAt(lectureIndex);
  } // end removeLecture()

  /**
   * delete session from the form and the formArray
   * @param SessionIndex 
   */
  removeSession(SessionIndex: number) {
    (<FormArray>this.editLectureForm.get('sessions')).removeAt(SessionIndex);
  } // end removeSession()

  /**
   * delete break from the form and the formArray
   * @param breakIndex 
   */
  removeBreak(breakIndex: number) {
    (<FormArray>this.editLectureForm.get('breaks')).removeAt(breakIndex);
  } // end removeLecture()

  // making syntactic sugar for formArray
  get f() { return this.editLectureForm.controls; }

  /**
   * delete lecture from DB
   * @param lectureName 
   */
  deleteLecture(lectureName: string) {
    this.showConferenceServices.deleteLecture(lectureName);
  } // end deleteLecture()

  /**
   * delete session from DB
   * @param sessionName 
   */
  deleteSession(sessionName: string) {
    this.showConferenceServices.deleteSession(sessionName);
  } // end deleteSession()

    /**
   * create objects of the data and send it to the server
   */
  onSubmit() {
    // sessions length
    var sessionsLength = (<FormArray>this.editLectureForm.get('sessions')).length;
    // create objects of all sessions
    for (var i = 0; i < sessionsLength; i++) {
      if((<FormArray>this.editLectureForm.get('sessions')).at(i).value.sessionName.length > 0) {
        this.allSessionssDetails.push({
          'sessionName': (<FormArray>this.editLectureForm.get('sessions')).at(i).value.sessionName,
          'sessionCategory': (<FormArray>this.editLectureForm.get('sessions')).at(i).value.sessionCategory,
          'sessionLocation': (<FormArray>this.editLectureForm.get('sessions')).at(i).value.sessionLocation,
          'sessionLead': (<FormArray>this.editLectureForm.get('sessions')).at(i).value.sessionLead
        });
      }
    } // end for

    var breaksLength = (<FormArray>this.editLectureForm.get('breaks')).length;
    // create objects of all breaks
    for (var i = 0; i < breaksLength; i++) {
      this.allBreaksDetails.push({
        'breakName': (<FormArray>this.editLectureForm.get('breaks')).at(i).value.breakName,
        'breakStartTime': (<FormArray>this.editLectureForm.get('breaks')).at(i).value.breakStartTime,
        'breakEndTime': (<FormArray>this.editLectureForm.get('breaks')).at(i).value.breakEndTime
      });
    } // end for

    // lectures lengths
    var length = (<FormArray>this.editLectureForm.get('lectures')).length;
    var authorsLength;
    // create objects of all lectures
    for (var i = 0; i < length; i++) {
      
      // authors length
      authorsLength = (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).length;
      for (var j = 0; j < authorsLength; j++) {
        this.allAuthorsDetails.push({
          'lecturerName':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorName,
          'lecturerCompany':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorCompany,
          'lecturerRole':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorRole,
          'lecturerCV':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorCV,
          'isLecturer':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.isLecturer,
          'authorImage':  (<FormArray>this.editLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorImage,
        });
      } // end for

      this.allLecturesDetails.push({
        'lectureName': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureName,
        'lectureStartTime': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureStartTime,
        'lectureEndTime': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureEndTime,
        'lectureDescription': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureDescription,
        'lectureClass': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureClass,
        'lectureFile': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureFile,
        'lectureSession': (<FormArray>this.editLectureForm.get('lectures')).at(i).value.lectureSession,
        'authors': this.allAuthorsDetails
      });
      this.allAuthorsDetails = [];
    } // end for
    this.saveDataToDatabase.saveLecturesDetails(this.allLecturesDetails, this.conferenceName);
    this.saveDataToDatabase.saveBreaksDetails(this.allBreaksDetails, this.conferenceName);
    if(this.allSessionssDetails.length > 0) {
      this.saveDataToDatabase.saveSessionssDetails(this.allSessionssDetails, this.conferenceName);
    }
    this.showConferenceServices.updatePublish(this.conferenceName);
    alert('conference saved successfuly');
      this.router.navigate(['/home']);
  } // end onSubmit()
}
