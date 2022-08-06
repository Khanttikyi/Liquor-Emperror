import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { FormUIService } from '../services/form-ui.service';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will w  ant to provide your main App Module
})
export class EditModalComponent implements OnInit, OnDestroy {

  oldData: any = {}
  name: string
  id: string
  private subscriptions: Subscription[] = [];
  constructor(
    public modal: NgbActiveModal,
    private uiService: FormUIService
  ) { }

  ngOnInit(): void {
  }

  save() {
    let postData = { ...this.oldData, pageName: this.name }
    if (!this.id) {
      this.modal.dismiss({ data: postData, type: 'save' })
    } else {
      this.uiService.updateNoID(postData).toPromise().then(res => {
        if (res) {
          this.modal.dismiss({ data: postData, type: 'edit' })
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
