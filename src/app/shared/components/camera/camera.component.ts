import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
    WebcamImage,
    WebcamInitError,
    WebcamModule,
    WebcamUtil,
} from 'ngx-webcam';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css'],
    standalone: true,
    imports: [CommonModule, WebcamModule, ButtonComponent],
})
export class CameraComponent implements OnInit {
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<
        boolean | string
    >();
    public multipleWebcamsAvailable = false;
    error!: WebcamInitError;
    currentImage!: WebcamImage;
    deviceId: string;
    devices: MediaDeviceInfo[] = [];

    constructor(private ref: DynamicDialogRef, private zone: NgZone) {}
    Clear() {
        this.currentImage = undefined;
    }

    Save() {
        this.ref.close(this.currentImage);
    }

    ngOnInit() {
        WebcamUtil.getAvailableVideoInputs().then(
            (mediaDevices: MediaDeviceInfo[]) => {
                console.log('🚀>>> ~ mediaDevices:', mediaDevices);
                this.devices = mediaDevices;
                this.multipleWebcamsAvailable =
                    mediaDevices && mediaDevices.length > 1;
            }
        );
    }

    handleInitError($event: WebcamInitError) {
        console.log('🚀>>> ~ $event:', $event);
        this.error = $event;
    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }

    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.currentImage = webcamImage;
    }

    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    public cameraWasSwitched(deviceId: string): void {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    }

    public showNextWebcam(directionOrDeviceId: boolean | string): void {
        this.nextWebcam.next(this.deviceId ?? directionOrDeviceId);
        this.zone.run(() => {
            this.error = undefined;
        });
    }

    public get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }
}
