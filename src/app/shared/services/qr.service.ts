import { Injectable } from '@angular/core';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

@Injectable({
    providedIn: 'root',
})
export class QrService {
    constructor() {}

    /**
     * Genera un QR en formato base64 con alta resolución.
     * @param value Texto o URL a codificar en el QR.
     * @returns Promise<string> con la imagen en base64.
     */
    async generarQR(value: string): Promise<string> {
        return QRCode.toDataURL(value, {
            width: 1000, // Aumenta la resolución del QR
            margin: 2,
            errorCorrectionLevel: 'H',
        });
    }

    /**
     * Genera un canvas con el QR y el texto en alta calidad.
     * @param value Texto o URL del QR.
     * @returns Promise<HTMLCanvasElement> con la imagen renderizada.
     */
    async generarImagenQR(value: string): Promise<HTMLCanvasElement> {
        const qrImage = await this.generarQR(value);
        const img = new Image();
        img.src = qrImage;

        return new Promise<HTMLCanvasElement>((resolve) => {
            img.onload = () => {
                const scaleFactor = 4; // Aumenta la resolución 4X
                const canvas = document.createElement('canvas');
                canvas.width = 151 * scaleFactor;
                canvas.height = 175 * scaleFactor;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.scale(scaleFactor, scaleFactor); // Escala para mayor calidad
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, 150, 150);

                    // Texto con mejor calidad
                    ctx.font = '16px Arial';
                    ctx.fillStyle = '#000000';
                    ctx.textAlign = 'center';
                    ctx.fillText(value, canvas.width / 2 / scaleFactor, 170);
                }

                resolve(canvas);
            };
        });
    }

    /**
     * Descarga el QR en formato PNG con alta calidad.
     * @param value Texto o URL del QR.
     */
    async descargarImagenQR(value: string): Promise<void> {
        const canvas = await this.generarImagenQR(value);
        const enlace = document.createElement('a');
        enlace.href = canvas.toDataURL('image/png', 1.0); // Calidad máxima
        enlace.download = `qr-${value}.png`;
        enlace.click();
    }

    /**
     * Descarga el QR en formato PDF con alta calidad.
     * @param value Texto o URL del QR.
     */
    async descargarPDFQR(value: string): Promise<void> {
        const canvas = await this.generarImagenQR(value);
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            unit: 'cm',
            format: [10, 10], // Tamaño exacto del PDF
            compress: true,
        });

        pdf.addImage(imgData, 'PNG', 0, 0, 10, 10, '', 'FAST'); // Mejora calidad con 'FAST'
        pdf.save(`qr-${value}.pdf`);
    }

    /**
     * Genera y descarga múltiples QR en PNG y PDF.
     * @param values Array de textos o URLs a convertir en QR.
     */
    async generarYDescargarQRs(values: string[]): Promise<void> {
        for (const value of values) {
            await this.descargarImagenQR(value); // Descarga imagen PNG
            await this.descargarPDFQR(value); // Descarga PDF
        }
    }
}
