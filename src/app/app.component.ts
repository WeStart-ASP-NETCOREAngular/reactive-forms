import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ReactiveForms';
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  forbiddenNames = ['wasim', 'ahmed'];

  ngOnInit(): void {
    // const control = new FormControl('', Validators.required);
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          //without using "this" within validator funtion
          // this.forbiddenNameValidator,
          this.forbiddenNameValidator,
          // in case of using "this" within validator function
          // this.forbiddenNameValidator.bind(this),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signUpForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  get username() {
    return this.signUpForm.get('userData.username')!;
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  get hobbies() {
    return this.signUpForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    const control = new FormControl('', Validators.required);
    this.hobbies.push(control);
  }

  // {[text: string]: boolean }
  // { nameIsForbidden : true}
  forbiddenNameValidator(
    control: FormControl
  ): { [text: string]: boolean } | null {
    // if (this.forbiddenNames.indexOf(control.value) !== -1) {
    //   return { nameIsForbidden: true };
    // }
    if (control.value == 'test') {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
