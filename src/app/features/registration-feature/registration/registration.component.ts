import { Component, OnInit }                                 from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router}                                              from '@angular/router';
import {tap}                                     from 'rxjs';
import {passwordLength}                        from '../../../../global';
import {SignUp, StrapiResponse}                              from '../../../../interfaces';
import {AuthService}                                         from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // TODO: Add errors for all controls
  public registrationForm: FormGroup = new FormGroup({
    'email': new FormControl<string>('', [Validators.email, Validators.required]),
    'name': new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
    'surname': new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
    'username': new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
    'password': new FormControl<string>('', [Validators.required, Validators.minLength(passwordLength)]),
    'passwordConfirm': new FormControl<string>('', [Validators.required, Validators.minLength(passwordLength)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public submit(): void {
    const formValue: {[control: string]: string} = this.registrationForm.value;
    const { password, username, name, surname, email } = formValue;
    const userData: SignUp = {
      password,
      name,
      surname,
      username,
      email
    }

    this.authService.signUp(userData)
      .subscribe((data: StrapiResponse) => {
        this.authService.setToken(data);
        this.router.navigate(['/dashboard'])

        this.registrationForm.reset();
      })
  }
}

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password')?.value;

    if (
      AC.get('passwordConfirm')?.touched ||
      AC.get('passwordConfirm')?.dirty
    ) {
      let verifyPassword = AC.get('passwordConfirm')?.value;

      if (password != verifyPassword) {
        AC.get('passwordConfirm')?.setErrors({ MatchPassword: true });
      } else {
        return null;
      }
    }

    return null;
  }
}
