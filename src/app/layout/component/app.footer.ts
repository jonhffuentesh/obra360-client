import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: ` <div class="layout-footer">
        Obra 360 -
        <a href="https://jfingenieria.site" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline"></a>
        <img src="assets/images/jfingenierialogovertical.png" alt="JF Ingeniería" height="24" class="w-auto h-6 align-middle" />
    </div>`
})
export class AppFooter {}
