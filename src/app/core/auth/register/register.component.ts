import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/ui/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  msgError: string = '';
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\w{6,}$/),
        ]),
        rePassword: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService
        .registerForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              //Navigate to login
              this.isLoading = false;
              this.msgError = '';
              setTimeout(() => {
                this.router.navigate(['/login']);
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
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
}
