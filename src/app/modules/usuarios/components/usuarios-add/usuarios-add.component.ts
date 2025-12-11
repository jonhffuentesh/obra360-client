import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';
import { UsuarioInterface, UpdateUsuario } from '../../interfaces/usuarios.interface';
import { MessageService } from 'primeng/api';
import { TipoIdentificacionService } from 'src/app/modules/tipo-identificacion/services/tipo-identificacion.service';
import { TipoIdentificacionInterface } from 'src/app/modules/tipo-identificacion/interfaces/tipo-identificacion.interface';
import { DepartamentosService } from 'src/app/shared/services/departamentos.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PrimeNGModule } from 'src/app/shared/primeng.module';

@Component({
    selector: 'app-usuarios-add',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, PrimeNGModule],
    providers: [MessageService],
    templateUrl: './usuarios-add.component.html'
})
export class UsuariosAddComponent implements OnInit, OnDestroy {
    // Estado del componente
    loading = false;
    submitted = false;
    isEditMode = false;
    userId: number | null = null;

    // Formulario
    usuarioForm: FormGroup;

    // Datos para los selectores
    tiposIdentificacion: TipoIdentificacionInterface[] = [];
    departamentos: any[] = [];
    municipios: any[] = [];
    roles: any[] = [];

    // Configuración
    maxDate: Date = new Date();

    // Subscripciones
    private subscription = new Subscription();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly usuarioService: UsuarioService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly messageService: MessageService,
        private readonly tipoIdentificacionService: TipoIdentificacionService,
        private readonly departamentosService: DepartamentosService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.checkEditMode();
        this.initializeForm();
        this.loadInitialData();
        this.setupFormSubscriptions();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        if (this.isFormInvalid()) {
            return;
        }

        this.loading = true;
        const formValue = this.usuarioForm.getRawValue();

        if (this.hasInvalidDate(formValue.fechaNacimiento)) {
            return;
        }

        if (this.hasEmptyRequiredFields(formValue)) {
            return;
        }

        const processedData = this.processFormData(formValue);

        if (this.isEditMode && this.userId) {
            this.updateUser(processedData as UpdateUsuario);
        } else {
            this.createUser(processedData as UsuarioInterface);
        }
    }

    onCancel(): void {
        this.router.navigate(['/usuarios']);
    }

    onDepartamentoChange(event: any): void {
        const departamentoId = event?.value;
        if (departamentoId) {
            this.loadMunicipios(Number(departamentoId));
        }
    }

    // Métodos privados
    private initializeForm(): void {
        const passwordValidators = this.isEditMode ? [] : [Validators.required, Validators.minLength(6)];

        this.usuarioForm = this.formBuilder.group({
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            fechaNacimiento: [null, Validators.required],
            tipoIdentificacionId: [null, Validators.required],
            identificacion: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', Validators.required],
            direccion: ['', Validators.required],
            departamentoId: [null, Validators.required],
            municipioId: [{ value: null, disabled: true }, Validators.required],
            observaciones: [''],
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', passwordValidators],
            rolId: [null, Validators.required]
        });
    }

    private loadInitialData(): void {
        this.loadTiposIdentificacion();
        this.loadDepartamentos();
        this.loadRoles();
    }

    private setupFormSubscriptions(): void {
        this.subscription.add(
            this.usuarioForm.get('departamentoId')?.valueChanges.subscribe((departamentoId) => {
                if (departamentoId) {
                    this.loadMunicipios(Number(departamentoId));
                    this.usuarioForm.get('municipioId')?.enable();
                } else {
                    this.municipios = [];
                    this.usuarioForm.get('municipioId')?.disable();
                    this.usuarioForm.get('municipioId')?.setValue(null);
                }
            })
        );
    }

    private loadTiposIdentificacion(): void {
        this.tipoIdentificacionService.getAll().subscribe({
            next: (data) => (this.tiposIdentificacion = data),
            error: (error) => this.handleServiceError('Error al cargar tipos de identificación', error)
        });
    }

    private loadDepartamentos(): void {
        this.departamentosService.getDepartamentos().subscribe({
            next: (data: any[]) => (this.departamentos = data),
            error: (error) => this.handleServiceError('Error al cargar departamentos', error)
        });
    }

    private loadMunicipios(departamentoId: number): void {
        if (!departamentoId) return;

        this.departamentosService.getMunicipiosDepartamentos(departamentoId).subscribe({
            next: (data: any[]) => {
                this.municipios = data;
                // Si hay municipios, habilitamos el control
                if (data.length > 0) {
                    this.usuarioForm.get('municipioId')?.enable();
                } else {
                    this.usuarioForm.get('municipioId')?.disable();
                    this.usuarioForm.get('municipioId')?.setValue(null);
                }
            },
            error: (error) => this.handleServiceError('Error al cargar municipios', error)
        });
    }

    private loadRoles(): void {
        this.usuarioService.getRoles().subscribe({
            next: (data) => (this.roles = data),
            error: (error) => this.handleServiceError('Error al cargar roles', error)
        });
    }

    private isFormInvalid(): boolean {
        this.submitted = true;
        return this.usuarioForm.invalid;
    }

    private handleSuccess(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: message
        });
        this.router.navigate(['/usuarios']);
    }

    private handleError(error: any): void {
        console.error('Error completo:', error);
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Error al crear el usuario. Por favor, intente nuevamente.'
        });
    }

    private handleServiceError(message: string, error: any): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
        console.error(message, error);
    }

    private hasInvalidDate(fechaNacimiento: Date): boolean {
        if (!fechaNacimiento) return false;

        const fecha = new Date(fechaNacimiento);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fecha > hoy) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'La fecha de nacimiento no puede ser futura'
            });
            this.loading = false;
            return true;
        }

        return false;
    }

    private hasEmptyRequiredFields(formValue: any): boolean {
        const camposRequeridos = ['nombres', 'apellidos', 'identificacion', 'correo', 'direccion', 'telefono', 'username'];

        // Solo agregar password a los campos requeridos si no estamos en modo edición
        if (!this.isEditMode) {
            camposRequeridos.push('password');
        }

        const camposVacios = camposRequeridos.filter((campo) => !formValue[campo]?.trim());
        if (camposVacios.length > 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Los siguientes campos son requeridos: ${camposVacios.join(', ')}`
            });
            this.loading = false;
            return true;
        }

        return false;
    }

    private processFormData(formValue: any): UsuarioInterface | UpdateUsuario {
        const baseData = {
            nombres: formValue.nombres.trim(),
            apellidos: formValue.apellidos.trim(),
            fechaNacimiento: formValue.fechaNacimiento ? new Date(formValue.fechaNacimiento).toISOString().split('T')[0] : '',
            tipoIdentificacionId: Number(formValue.tipoIdentificacionId),
            identificacion: formValue.identificacion.trim(),
            correo: formValue.correo.trim(),
            telefono: formValue.telefono.trim(),
            direccion: formValue.direccion.trim(),
            departamentoId: Number(formValue.departamentoId),
            municipioId: Number(formValue.municipioId),
            observaciones: formValue.observaciones?.trim() || '',
            username: formValue.username.trim(),
            rolId: Number(formValue.rolId)
        };

        // Si estamos en modo edición, retornamos un UpdateUsuario
        if (this.isEditMode) {
            const updateData: UpdateUsuario = { ...baseData };
            if (formValue.password) {
                updateData.password = formValue.password.trim();
            }
            return updateData;
        }

        // Si estamos creando, retornamos un UsuarioInterface completo
        return {
            ...baseData,
            password: formValue.password.trim()
        } as UsuarioInterface;
    }

    private checkEditMode(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.userId = Number(id);
            this.loadUserData(this.userId);
        }
    }

    private loadUserData(id: number): void {
        this.loading = true;
        this.usuarioService.getUsuario(id).subscribe({
            next: (user) => {
                this.patchFormWithUserData(user);
                this.loading = false;
            },
            error: (error) => {
                this.handleError(error);
                this.loading = false;
            }
        });
    }

    private patchFormWithUserData(user: any): void {
        const formData = {
            nombres: user.nombres,
            apellidos: user.apellidos,
            fechaNacimiento: new Date(user.fechaNacimiento),
            tipoIdentificacionId: user.tipoIdentificacionId,
            identificacion: user.identificacion,
            correo: user.correo,
            telefono: user.telefono,
            direccion: user.direccion,
            departamentoId: user.departamentoId,
            municipioId: user.municipioId,
            observaciones: user.observaciones,
            username: user.auth?.username ?? user.username ?? '',
            rolId: user.auth?.rol?.id ?? user.rolId ?? null,
            password: ''
        };
        this.usuarioForm.patchValue(formData);

        if (user.departamentoId) {
            this.loadMunicipios(user.departamentoId);
        }
    }

    private createUser(data: UsuarioInterface): void {
        this.usuarioService
            .crearUsuario(data)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: () => this.handleSuccess('Usuario creado correctamente'),
                error: (error) => this.handleError(error)
            });
    }

    private updateUser(formData: UpdateUsuario): void {
        if (formData.password === '') {
            delete formData.password;
        }
        this.usuarioService
            .actualizarUsuario(this.userId!, formData)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario actualizado correctamente'
                    });
                    this.router.navigate(['/usuarios']);
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error?.message || 'Error al actualizar el usuario'
                    });
                }
            });
    }
}
