import { Component, OnInit }                from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router}                             from '@angular/router';
import {passwordLength}                     from '../../../../global';
import {SignIn, StrapiResponse}             from '../../../../interfaces';
import {AuthService}                        from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    'identifier': new FormControl<string>('', [Validators.required, Validators.email]),
    'password': new FormControl<string>('', [Validators.required, Validators.minLength(passwordLength)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onLogin(): void {
    const {identifier, password} = this.loginForm.value;
    const signInData: SignIn = {
      password,
      identifier
    }

    this.authService.signIn(signInData)
      .subscribe((data: StrapiResponse) => {
        this.authService.setToken(data);
        this.router.navigate(['/dashboard'])

        this.loginForm.reset();
      })
  }
}
