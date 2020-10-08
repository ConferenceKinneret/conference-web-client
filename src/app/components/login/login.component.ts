import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // login controls and data
  returnUrl: string; // for return to login page
  submitted: boolean = false;
  loading: boolean = false;
  loginToken: object; // login token
  loginDetails: object; // login data

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private user: UserService,
    private router: Router) {
  }
  ngOnInit() {
    // create the controls of the form array
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // making syntactic sugar for formArray
  get f() { return this.loginForm.controls; }

  /**
   * create object of the data and send it to the server
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    } // end if
    this.loading = true; // uses for design (loading spiner)

    // adding the data of login to object
    this.loginDetails = {
      'email': this.f.email.value,
      'password': this.f.password.value
    };
    if(this.f.email.value) {
      localStorage.setItem('email',this.f.email.value);
    }
    this.user.login(this.loginDetails).subscribe(result => {
      this.loginToken = result;
      console.log(Object.keys(result).map(key => result[key]));  
      localStorage.setItem('token',""+Object.keys(result).map(key => result[key]));

      alert('loged in successfuly');
      this.router.navigate(['/home']);

      }, error => alert('your details is incorrect'));

  } // end onSubmit()
}
