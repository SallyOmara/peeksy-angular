import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  msgError: string = '';
  isLoading: boolean = false;
  flag: boolean = true;
  subscription: Subscription = new Subscription();
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              //Navigate to Home

              // Save Token
              this.cookieService.set('token', res.token);
              console.log(this.authService.decodeToken()?.id);

              this.isLoading = false;
              this.msgError = '';
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 1000);
            }
          },
          error: (err) => {
            //Show Error
            this.msgError = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
