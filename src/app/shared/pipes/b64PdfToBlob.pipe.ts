import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'b64PdfToBlob',
    standalone: true,
})
export class B64PdfToBlobPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        try {
            const notIninitial = value.split(',')[1];
            const byteCharacters = atob(notIninitial);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Crear URL del blob
            const blobUrl = URL.createObjectURL(blob);
            return blobUrl;
        } catch (error) {
            console.error('Error al convertir el base64 a blob', error);
            return null;
        }
    }
}
