import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  activate: () => void;
  deactivate: () => void;
}
