import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { BuildConferenceService } from '../../services/build-conference/build-conference.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-conference',
  templateUrl: './build-conference.component.html',
  styleUrls: ['./build-conference.component.scss']
})
/**
 * @author Amjad Tarif
 */
export class BuildConferenceComponent implements OnInit {

  buildLectureForm: FormGroup; // conference and lecture controls and data
  conferenceDetails: object; // conference data
  allLecturesDetails = new Array(); // lectures data
  allAuthorsDetails = new Array(); // authors data
  allSessionssDetails = new Array(); // sessions data
  allBreaksDetails = new Array(); // breaks data
  submitted: boolean = false;
  loading: boolean = false;

  @ViewChild('conferenceLogoLabel', { static: false })
  conferenceLogoLabel: ElementRef;
  @ViewChild('lectureFile', { static: false })
  lectureFileLabel: ElementRef;
  @ViewChild('authorImageLabel', { static: false })
  authorImageLabel: ElementRef;
  fileToUpload: File = null;

  constructor(private fb: FormBuilder, private saveDataToDatabase: BuildConferenceService, 
    private router: Router) { }

  ngOnInit() {
    // create the controls of the form array
    this.buildLectureForm = this.fb.group({
      confereceName: ['', Validators.required],
      conferecePlace: ['', Validators.required],
      confereceDate: ['', Validators.required],
      confereceLogo: [''],
      publish: [''],
      confereceDescription: [''],
      sessions: this.fb.array([this.addSessionFormGroup()]),
      lectures: this.fb.array([this.addLectureFormGroup()]),
      breaks: this.fb.array([this.addBreakFormGroup()])
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
    (<FormArray>this.buildLectureForm.get('sessions')).push(this.addSessionFormGroup());
  } // end addNewSession()

  /**
   * adding new lecture controls 
   */
  addNewLecture() {
    (<FormArray>this.buildLectureForm.get('lectures')).push(this.addLectureFormGroup());
  } // end addNewLecture()

  /**
   * adding new lecture controls 
   */
  addNewAuthor(authorIndex: number) {
    (<FormArray>this.buildLectureForm.get('lectures').get([authorIndex]).get('authors')).push(this.addAuthorFormGroup());
  } // end addNewAuthor()

  /**
   * adding new break controls 
   */
  addNewBreak() {
    (<FormArray>this.buildLectureForm.get('breaks')).push(this.addBreakFormGroup());
  } // end addNewSession()

  /**
   * delete lecture from the form and the formArray
   * @param lectureIndex 
   */
  removeLecture(lectureIndex: number) {
    (<FormArray>this.buildLectureForm.get('lectures')).removeAt(lectureIndex);
  } // end removeLecture()

  /**
   * delete session from the form and the formArray
   * @param SessionIndex 
   */
  removeSession(SessionIndex: number) {
    (<FormArray>this.buildLectureForm.get('sessions')).removeAt(SessionIndex);
  } // end removeSession()

  /**
   * delete break from the form and the formArray
   * @param breakIndex 
   */
  removeBreak(breakIndex: number) {
    (<FormArray>this.buildLectureForm.get('breaks')).removeAt(breakIndex);
  } // end removeLecture()

  // making syntactic sugar for formArray
  get f() { return this.buildLectureForm.controls; }

  /**
   * create objects of the data and send it to the server
   */
  onSubmit() {
    this.submitted = true
    // stop here if form is invalid
    /*if (this.buildLectureForm.invalid) {
      return;
    } // end if*/

    this.loading = true; // uses for design (loading spinner)
    // create object of the conference
    this.conferenceDetails = {
      'name': this.buildLectureForm.controls.confereceName.value,
      'place': this.buildLectureForm.controls.conferecePlace.value,
      'date': this.buildLectureForm.controls.confereceDate.value,
      'logo': this.buildLectureForm.controls.confereceLogo.value,
      'description': this.buildLectureForm.controls.confereceDescription.value,
      'publish': this.buildLectureForm.controls.publish.value,
      'ownerEmail': localStorage.getItem('email')
    };
    // sessions length
    var sessionsLength = (<FormArray>this.buildLectureForm.get('sessions')).length;
    // create objects of all sessions
    for (var i = 0; i < sessionsLength; i++) {
      this.allSessionssDetails.push({
        'sessionName': (<FormArray>this.buildLectureForm.get('sessions')).at(i).value.sessionName,
        'sessionCategory': (<FormArray>this.buildLectureForm.get('sessions')).at(i).value.sessionCategory,
        'sessionLocation': (<FormArray>this.buildLectureForm.get('sessions')).at(i).value.sessionLocation,
        'sessionLead': (<FormArray>this.buildLectureForm.get('sessions')).at(i).value.sessionLead
      });
    } // end for

    var breaksLength = (<FormArray>this.buildLectureForm.get('breaks')).length;
    // create objects of all breaks
    for (var i = 0; i < breaksLength; i++) {
      this.allBreaksDetails.push({
        'breakName': (<FormArray>this.buildLectureForm.get('breaks')).at(i).value.breakName,
        'breakStartTime': (<FormArray>this.buildLectureForm.get('breaks')).at(i).value.breakStartTime,
        'breakEndTime': (<FormArray>this.buildLectureForm.get('breaks')).at(i).value.breakEndTime
      });
    } // end for

    // lectures lengths
    var length = (<FormArray>this.buildLectureForm.get('lectures')).length;
    var authorsLength;
    // create objects of all lectures
    for (var i = 0; i < length; i++) {
      
      // authors length
      authorsLength = (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).length;
      for (var j = 0; j < authorsLength; j++) {
        this.allAuthorsDetails.push({
          'lecturerName':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorName,
          'lecturerCompany':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorCompany,
          'lecturerRole':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorRole,
          'lecturerCV':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorCV,
          'isLecturer':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.isLecturer,
          'authorImage':  (<FormArray>this.buildLectureForm.get('lectures').get([i]).get('authors')).at(j).value.authorImage,
        });
      } // end for

      this.allLecturesDetails.push({
        'lectureName': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureName,
        'lectureStartTime': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureStartTime,
        'lectureEndTime': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureEndTime,
        'lectureDescription': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureDescription,
        'lectureClass': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureClass,
        'lectureFile': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureFile,
        'lectureSession': (<FormArray>this.buildLectureForm.get('lectures')).at(i).value.lectureSession,
        'authors': this.allAuthorsDetails
      });
      this.allAuthorsDetails = [];
    } // end for
    this.saveDataToDatabase.saveConferenceDetails(this.conferenceDetails);
    this.saveDataToDatabase.saveLecturesDetails(this.allLecturesDetails, this.conferenceDetails['name']);
    this.saveDataToDatabase.saveSessionssDetails(this.allSessionssDetails, this.conferenceDetails['name']);
    this.saveDataToDatabase.saveBreaksDetails(this.allBreaksDetails, this.conferenceDetails['name']);
    alert('conference saved successfuly');
      this.router.navigate(['/home']);
  } // end onSubmit()

  /**
   * write the name of the logo in the label
   * @param files 
   */
  conferenceLogoChange(files: FileList) {
    this.conferenceLogoLabel.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }// end conferenceLogoChange()

  /**
   * write the name of the file lecture in the label
   * @param files 
   */
  lectureFileChange(files: FileList) {
    this.lectureFileLabel.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
  }// end lectureFileChange()

  /**
   * write the name of the author image in the label
   * @param files 
   */
  authorImageChange(files: FileList) {
    this.authorImageLabel.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }// end authorImageChange()
}
