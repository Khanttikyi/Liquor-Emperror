import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss'],
})
export class AddSizeComponent implements OnInit {
  size: any;
  constructor(private modal: NgbActiveModal) { }

  ngOnInit() { }

  cancel() {
    this.modal.close()
  }
  createSize() {
    this.modal.close({ code: this.size, value: this.size })
  }
}
