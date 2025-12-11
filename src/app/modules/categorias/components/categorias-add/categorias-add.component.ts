import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateCategoria, CategoriaInterface } from '../../interfaces/categorias.interface';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../services/categorias.service';
import { finalize, catchError, Subject, takeUntil } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { PrimeNGModule } from 'src/app/shared/primeng.module';

@Component({
  selector: 'app-categorias-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './categorias-add.component.html',
  styleUrl: './categorias-add.component.scss'
})
export class CategoriasAddComponent implements OnInit, OnDestroy {
  categoriaForm!: FormGroup;
  loading = false;
  isEditMode = false;
  categoriaId: number | null = null;
  categorias: CategoriaInterface[] = [];
  categoriasFiltradas: CategoriaInterface[] = [];
  private readonly destroy$ = new Subject<void>();
  private readonly NAVIGATION_DELAY = 1500;

  constructor(
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategorias();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoriaId = +id;
      this.loadCategoria();
    }
  }

  private loadCategorias(): void {
    this.loading = true;
    this.categoriasService.getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (categorias) => {
          this.categorias = categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
          this.categoriasFiltradas = [...this.categorias];
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las categorías'
          });
        }
      });
  }

  private loadCategoria(): void {
    if (!this.categoriaId) return;

    this.loading = true;
    this.categoriasService.getById(this.categoriaId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (categoria) => {
          this.categoriaForm.patchValue(categoria);
        },
        error: (error) => {
          console.error('Error al cargar la categoría:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar la categoría'
          });
          this.router.navigate(['/categorias']);
        }
      });
  }

  private initForm(): void {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    this.loading = true;
    const categoria: CreateCategoria = this.categoriaForm.value;

    const request$ = this.isEditMode && this.categoriaId
      ? this.categoriasService.update(this.categoriaId, categoria)
      : this.categoriasService.create(categoria);

    request$.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.isEditMode 
            ? 'Categoría actualizada correctamente'
            : 'Categoría creada correctamente'
        });

        if (this.isEditMode) {
          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, this.NAVIGATION_DELAY);
        } else {
          this.categoriaForm.reset();
          this.loadCategorias();
        }
      },
      error: (error) => {
        console.error('Error al guardar la categoría:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar la categoría'
        });
      }
    });
  }

  filtrarCategorias(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.categoriasFiltradas = this.categorias
      .filter(c => c.nombre.toLowerCase().includes(searchTerm))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  toggleRow(categoria: CategoriaInterface): void {
    categoria.expanded = !categoria.expanded;
  }

  editarCategoria(categoria: CategoriaInterface): void {
    this.router.navigate(['/categorias/editar', categoria.id]);
  }

  confirmarEliminar(categoria: CategoriaInterface): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la categoría "${categoria.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => this.eliminarCategoria(categoria)
    });
  }

  private eliminarCategoria(categoria: CategoriaInterface): void {
    this.loading = true;
    this.categoriasService.delete(categoria.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Categoría eliminada correctamente'
          });
          this.loadCategorias();
        },
        error: (error) => {
          console.error('Error al eliminar la categoría:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la categoría'
          });
        }
      });
  }
}
