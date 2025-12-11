import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import QrScanner from 'qr-scanner';
import { ButtonComponent } from '../button/button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        DialogModule,
        FormsModule,
        RadioButtonModule,
    ],
    providers: [DialogService],
})
export class QrScannerComponent implements OnInit {
    scanActive: boolean = false;
    qrScanner!: QrScanner;
    @Input({ required: true }) id!: number;
    @Input() disable: boolean = false;
    @Input() multiple: boolean = false;
    @Input() label = 'QR';
    @Input() title = 'Escanear QR';
    @Output() result: EventEmitter<QrScanner.ScanResult> =
        new EventEmitter<QrScanner.ScanResult>();
    visible = false;
    opciones: any[] = [
        { label: 'Uno a Uno', value: false },
        { label: 'Multiples', value: true },
    ];

    constructor(private ngZone: NgZone) {}

    ngOnInit() {}

    open() {
        this.visible = true;
    }

    scann() {
        const video = document.getElementById('qr-video-' + this.id);
        this.scanActive = true;
        this.qrScanner = new QrScanner(
            video as HTMLVideoElement,
            (result) => {
                this.ngZone.run(() => {
                    this.processResult(result);
                });
            },
            {
                highlightScanRegion: true,
                returnDetailedScanResult: true,
                highlightCodeOutline: true,
                maxScansPerSecond: this.multiple ? 1 : 25, // this is the default value
                /* your options or returnDetailedScanResult: true if you're not specifying any other options */
            }
        );
        this.qrScanner.start().then(() => {
            console.log('started');
        });
    }

    processResult(result: QrScanner.ScanResult) {
        console.log('decoded qr code:', result);
        this.result.emit(result);
        if (!this.multiple) {
            this.stopScann();
        }
    }

    stopScann() {
        this.scanActive = false;
        this.qrScanner.stop();
        this.visible = false;
    }
}
