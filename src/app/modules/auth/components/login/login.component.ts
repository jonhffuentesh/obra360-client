import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../interfaces/login-credentials';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, ToastModule],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        if (this.loginForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor ingresa usuario y contraseña'
            });
            return;
        }

        this.loading = true;
        const credentials: LoginCredentials = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        this.authService
            .login(credentials)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Inicio de sesión exitoso'
                    });
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error?.message || 'Error al iniciar sesión'
                    });
                    // Limpiar la contraseña en caso de error
                    this.loginForm.patchValue({ password: '' });
                }
            });
    }
}
