import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  activate: (message:string,title:string) => Promise<boolean>;
  deactivate: () => Promise<boolean>;
}
