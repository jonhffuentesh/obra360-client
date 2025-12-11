import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AvatarModule } from 'primeng/avatar';
import '@angular/common/locales/global/es';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TableConfig } from '../../interfaces/table-config.interface';
import { EstadoOrdenComponent } from '../estado-orden/estado-orden.component';
import { LocalCurrencyPipe } from '../../pipes/local-currency.pipe';


@Component({
    selector: 'app-default-td-table',
    templateUrl: './default-td-table.component.html',
    standalone: true,
    styles: [],
    imports: [
        CommonModule,
        TooltipModule,
        OverlayPanelModule,
        ButtonModule,
        AvatarModule,
        TableModule,
        BadgeModule,

        EstadoOrdenComponent,
        LocalCurrencyPipe,
    ],
    providers: [DatePipe]
})
export class DefaultTdTableComponent implements OnInit {
    @Input() row: any;
    @Input() col!: TableConfig;
    showTooltip = false;
    // sanitizedValue!: SafeHtml;
    // textValue!: string;
    // @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
    constructor(
        private sanitizer: DomSanitizer,
        private datePipe: DatePipe,
        @Inject(LOCALE_ID) private locale: string
        ) {}

    ngOnInit(): void {
        // if (this.col.field === this.actividad) {
        //   const htmlValue = this.row[this.col.field];
        //   this.sanitizedValue = this.sanitizer.bypassSecurityTrustHtml(
        //     this.row[this.col.field]
        //   );
        //   this.textValue = this.removeHTMLTags(htmlValue);
        // }
    }

    isObjectNotEmpty(obj: any): boolean {
        return obj !== undefined && obj !== null && Object.keys(obj).length > 0;
    }
    formatObjectForDisplay(obj: any): string {
        if (!obj) {
            return '';
        }

        let formattedString = JSON.stringify(obj);

        if (formattedString.length > 50) {
            formattedString = formattedString.slice(0, 50) + '...';
        }

        return formattedString;
    }

    // removeHTMLTags(html: string): string {
    //   const div = document.createElement('div');
    //   div.innerHTML = html;
    //   return div.textContent || div.innerText || '';
    // }

    // showOverlayPanel(event: any, actividad: string) {
    //   this.actividad = actividad;
    //   this.overlayPanel.toggle(event);
    // }

    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    getClassForEstado(fieldValue: string): string {
        return `estado-cilindro-${fieldValue.replace(/\s+/g, '')}`;
    }

    formatDate(value: any, format?: string, locale?: string): string | null {
        if (value === null || value === undefined) return null;
        const usedLocale = locale || this.locale;
        return this.datePipe.transform(value, format, usedLocale);
    }
}
