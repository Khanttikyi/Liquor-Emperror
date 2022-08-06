import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { ProductsService } from '../../_metronic/core/services/products.service';
// import { uuid } from 'uuid';
import { Router } from '@angular/router';

import { v4 } from 'uuid';
import { FormUIService } from './services/form-ui.service';
import { FormUI } from './models/form-ui.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { COLTYPE, TableCol } from '../../_metronic/shared/crud-table/components/material-table-view/table-dto';
import { FormUiCol, FormUiDisplayCol } from './models/form-ui.const';
import { MaterialTableViewComponent } from '../../_metronic/shared/crud-table/components/material-table-view/material-table-view.component';

export interface FromObj {
  id: string
  name: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  forms: any[] = []
  form: FromObj = {
    id: "",
    name: "",
  }
  ELEMENT_COL = FormUiCol
  displayedColumns = FormUiDisplayCol
  private unsubscribe: Subscription[] = []
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent

  ELEMENT_DATA: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];
  constructor(private router: Router, private uiService: FormUIService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.uiService.getByType().toPromise().then((res: any) => {
      //console.log(res);
      if (res) {
        this.forms = res.forms
        this.cdRef.detectChanges()
        this.matTable.reChangeData()
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  delete(index, id) {
    this.uiService.delete(id).toPromise().then(res => {
      if (res)
        this.forms.splice(index, 1)

      this.cdRef.detectChanges()
      this.matTable.reChangeData()
    })
  }

  edit(index: number, data: FormUI = {}) {
    const modalRef = this.modalService.open(EditModalComponent, { size: 'md', backdrop: false });
    modalRef.componentInstance.oldData = data
    modalRef.componentInstance.id = data.dyProductID
    modalRef.componentInstance.name = JSON.parse(JSON.stringify(data)).pageName
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        if (res.type == 'save') {
          this.submit(res.data)
        } else if (res.type == 'edit') {
          this.forms[index] = res.data
          this.cdRef.detectChanges()
          this.matTable.reChangeData()
        }
      }
    })
  }

  actionBtn(event) {
    // console.log(event);
    let index = this.forms.findIndex(x => x.dyProductID == event.data.dyProductID)
    if (event.cmd == 'edit') {
      this.editLayout(event.data)
    } else if (event.cmd == 'delete') {
      this.delete(index, event.data.dyProductID)
    }
    else if (event.cmd == 'view') {
      this.editLayout(event.data)
    }
  }

  editLayout(item: any) {
    this.uiService.selectedForm = item
    this.router.navigateByUrl("/config-layout")
  }

  viewLayout(item: any) {
    this.uiService.selectedForm = item
    this.router.navigateByUrl("/product-form")
  }

  submit(data) {
    // if (!(this.form.name.trim())) return false
    let postData = {
      pageName: data.pageName,
      config: JSON.stringify({}),
      simpleTest: "nothing here",
      type: "Form",
    }
    this.uiService.save(postData).toPromise().then(res => {
      if (res) {
        // console.log(res);
        
        this.uiService.selectedForm = res
        this.router.navigateByUrl("/config-layout")
        // this.getList()
      }
    })

  }

}
