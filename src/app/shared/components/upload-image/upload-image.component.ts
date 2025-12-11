import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonComponent], 
})
export class UploadImageComponent {
  @Output() imageSelected = new EventEmitter<File | null>(); // Emitimos el archivo seleccionado o null
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivo
  selectedImage: File | null = null; // Almacenamos la imagen seleccionada localmente
  imagePreview: string | null = null; // Vista previa de la imagen seleccionada

  // Método para seleccionar la imagen
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar si es un archivo de imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
      }

      this.selectedImage = file;
      this.imageSelected.emit(this.selectedImage); // Emitimos la imagen seleccionada

      // Generar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para eliminar la imagen seleccionada
  clearImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
    this.imageSelected.emit(null); // Emitimos null para indicar que se eliminó la imagen

    // Restablecer el valor del input de archivo a null
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
