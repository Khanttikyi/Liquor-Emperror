import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewSupplierComponent } from './add-new-supplier/add-new-supplier.component';
import { supplierCol, supplierDisplayCol } from './supplier-const';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  supplierList: any = [];
  ELEMENT_COL: any = supplierCol
  displayedColumns: any = supplierDisplayCol
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getsupplierList()
  }
  getsupplierList() {
    this.database.getData('SUPPLIER').then((res) => {
      // console.log(res);
      this.supplierList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })
  }

  async addNewSupplier(data?) {
    console.log("sfdsf", data);
    const modalRef = this.modalService.open(AddNewSupplierComponent, { size: 'md', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // console.log(result);

        if (data) {
          this.database.update('SUPPLIER', result)
          this.getsupplierList()
        } else {
          this.database.create('SUPPLIER', result)
          this.getsupplierList()
        }
      }
    })
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewSupplier(event.data)
    }
    else {
      this.database.remove("SUPPLIER", event.data.supplierCode, "supplierCode")
      this.getsupplierList()
    }

  }

}
