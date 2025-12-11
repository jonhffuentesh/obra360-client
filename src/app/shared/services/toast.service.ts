import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    data?: any;
    icon?: string;
    contentStyleClass?: string;
    styleClass?: string;
    closeIcon?: string;
}


@Injectable({ providedIn: 'root' })
export class ToastService {
    private actions = {
        create: 'creado',
        update: 'actualizado',
        delete: 'eliminado',
    };
    constructor(private messageService: MessageService) {}

    add(data: Message) {
        this.messageService.add({ ...data, key: 'main' });
    }

    success(type: 'create' | 'update' | 'delete', detail?: string) {
        const action = this.actions[type];
        this.add({
            severity: 'success',
            summary: 'Hecho',
            detail: detail || `El registro ha sido ${action}`,
        });
    }

    updateSuccess(message?: string) {
        this.success('update', message);
    }

    createSuccess(message?: string) {
        this.success('create', message);
    }

    deleteSuccess(message?: string) {
        this.success('delete', message);
    }

    error(type: 'create' | 'update' | 'delete', detail?: string) {
        const action = this.actions[type];
        this.add({
            severity: 'error',
            summary: 'Error',
            detail: detail || `El registro no ha sido ${action}`,
        });
    }
}
