import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ButtonComponent } from '../button/button.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-firma',
    templateUrl: './firma.component.html',
    styleUrls: ['./firma.component.css'],
    standalone: true,
    imports: [CommonModule, ButtonComponent],
})
export class FirmaComponent implements OnInit {
    signaturePad!: SignaturePad;
    constructor(private ref: DynamicDialogRef) {}

    ngOnInit() {
        var canvas = document.getElementById('signature-pad');
        this.signaturePad = new SignaturePad(canvas as HTMLCanvasElement, {
            backgroundColor: 'rgb(255, 255, 255)',
        });
    }

    onSave() {
        const data = this.signaturePad.toDataURL('image/png');
        const base64 = this.signaturePad.toDataURL();
        this.ref.close(data);
    }

    clear() {
        this.signaturePad.clear();
    }
}
