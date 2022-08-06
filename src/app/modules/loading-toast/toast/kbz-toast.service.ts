import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message?: string,
  header?: string,
  type?: string
}

@Injectable()
export class KBZToastService {
  private toastSubject = new Subject<ToastMessage>();

  toastState = this.toastSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: KBZToastService) {
    if (prior) {
      //console.log('toast service already exists');
      return prior;
    } else {
      //console.log('created toast service')
    }
  }

  activate(message?: string, type?: string) {
    this.toastSubject.next(<ToastMessage>{ message, type });
  }
}
