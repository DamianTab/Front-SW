import { Injectable, ErrorHandler } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class InternalErrorHandler implements ErrorHandler {
    constructor(private toastService: ToastService) {}

    handleError(error: Error) {
        this.toastService.error(error.name + ": " + error.message);
    }
}
