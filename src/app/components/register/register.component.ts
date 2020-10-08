import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
/**
 * @author Amjad Tarif
 */
export class RegisterComponent implements OnInit {

  registerForm: FormGroup; // register controls and data
  loading: boolean = false;
  submitted: boolean = false;
  registerDetails: object; // register data

  constructor(private formBuilder: FormBuilder, private user:UserService, private router: Router) { }

  ngOnInit() {
    // create the controls of the form array
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {validator: MustMatch('password', 'confirmPassword')});
  }
  // making syntactic sugar for formArray
  get f() { return this.registerForm.controls; }

  /**
   * create object of the data and send it to the server
   */
  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } // end if
    this.loading = true; // uses for design (loading spiner)

    // adding the data of register to object
    this.registerDetails = {
      'name': this.f.name.value,
      'email': this.f.email.value,
      'role': this.f.role.value,
      'password': this.f.password.value,
    };
    this.user.register(this.registerDetails);
    this.router.navigate(['/']);
  } // end onSubmit()

}
