import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertModelComponet } from "./alert-model.component";
import { AlertService } from "./alert.service";

@Component({
  template: "",
  selector: "app-alert"
})
export class AlertComponet implements OnInit, OnDestroy {

  constructor(private alertService: AlertService, private modalService: NgbModal,) {
    alertService.activate = this.activate.bind(this)
    alertService.deactivate = this.deactivate.bind(this)
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  activate(message: string, title: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const modalRef = this.modalService.open(AlertModelComponet, { size: 'sm', backdrop: false });
      modalRef.componentInstance.title = title
      modalRef.componentInstance.message = message
      modalRef.result.then(() => { }, (res) => {
        resolve(res);
      });
    })
  }

  deactivate() {
    this.modalService.dismissAll()
  }

}