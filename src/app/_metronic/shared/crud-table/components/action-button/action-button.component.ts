import { Component, OnInit, Input, OnChanges, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  constructor() { }

  @Output()
  emitter = new EventEmitter<any>();

  @Input()
  data:any= {};

  @Input() viewBtn:any = {}

  ngOnInit(): void { }

  onActionEdit() {
    this.emitter.emit({
      cmd: "edit",
      data: this.data,
    });
  }

  onActionView() {
    this.emitter.emit({
      cmd: "view",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }

  onActionDelete() {
    this.emitter.emit({
      cmd: "delete",
      data: this.data,
    });
  }
  onActionDownload() {
    this.emitter.emit({
      cmd: "download",
      data: this.data,
    });
  }
}
