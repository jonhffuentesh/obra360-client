import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { ImageModule } from 'primeng/image';
import { QrService } from '../../services/qr.service';

@Component({
    selector: 'app-qr',
    template: `
        <div
            id="contenido"
            class="tw-flex tw-flex-col tw-bg-white"
            style="width: 151px; height:175px"
        >
            <p-image
                appendTo="body"
                *ngIf="qrCode"
                [src]="qrCode"
                width="150px"
                [preview]="true"
                height="150px"
                alt="qr"
                class="rounded-lg shadow-md object-contain"
            />
            <div class="tw-text-center tw-mb-2">
                <span>{{ value }}</span>
            </div>
        </div>

        <div class="tw-flex tw-gap-4 tw-mt-2 tw-justify-center ">
            <button
                *ngIf="showDownloadImage"
                pButton
                [rounded]="true"
                size="small"
                [raised]="true"
                icon="pi pi-image"
                (click)="capturarImagen()"
            ></button>
            <button
                *ngIf="showDownloadPdf"
                pButton
                icon="pi pi-file-pdf"
                [rounded]="true"
                size="small"
                [raised]="true"
                (click)="generarPDF()"
            ></button>
        </div>
    `,
    styles: [],
    standalone: true,
    imports: [CommonModule, ButtonModule, ImageModule],
})
export class QrComponent implements OnInit {
    @Input({ required: true }) value = '';
    @Input() showDownloadPdf = true;
    @Input() showDownloadImage = true;
    qrCode: string | undefined;

    constructor(
        private qrService: QrService,
        private config: DynamicDialogConfig
    ) {
        console.log('🚀>>> ~ config:', config);
        if (this.config.data) {
            console.log('🚀>>> ~ this.config.data:', this.config.data);
            this.value = this.config.data.value;
        }
    }

    async ngOnInit() {
        this.qrCode = await this.qrService.generarQR(this.value);
    }

    public async capturarImagen() {
        // const div = document.getElementById('contenido');
        // if (div) {
        //     html2canvas(div, {
        //         scale: 3, // Aumenta la escala para mayor calidad
        //     }).then((canvas) => {
        //         const imagen = canvas.toDataURL('image/png');
        //         const enlace = document.createElement('a');
        //         enlace.href = imagen;
        //         enlace.download = `qr-${this.value}.png`;
        //         enlace.click();
        //     });
        // }
        await this.qrService.descargarImagenQR(this.value);
    }

    public async generarPDF() {
        await this.qrService.descargarPDFQR(this.value);
        // const div = document.getElementById('contenido');
        // if (div) {
        //     html2canvas(div, {
        //         scale: 3, // Aumenta la calidad de la captura
        //         useCORS: true,
        //     }).then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png', 1.0);
        //         const pdf = new jsPDF({
        //             orientation: 'p',
        //             unit: 'cm', // Unidades en centímetros
        //             format: [10, 12], // Ancho x Alto en cm
        //             compress: true,
        //         });

        //         const imgWidth = 10; // Ajuste al ancho del PDF
        //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

        //         pdf.addImage(
        //             imgData,
        //             'PNG',
        //             0,
        //             0,
        //             imgWidth,
        //             imgHeight,
        //             '',
        //             'FAST'
        //         );
        //         pdf.save(`qr-${this.value}.pdf`);
        //     });
        // }
    }
}
