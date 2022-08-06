import { COLTYPE, TableCol } from '../../../_metronic/shared/crud-table/components/material-table-view/table-dto'
export const FormUiCol: TableCol[] = [
  {
    title: "Group Name",
    type: COLTYPE.FEILD,
    field: "pageName",
    // amtFormat?: boolean,
    // isTitle?: boolean
    // isDate?: boolen
  },
  {
    title: "Simple Data",
    type: COLTYPE.FEILD,
    field: "simpleTest",
    // amtFormat?: boolean,
    // isTitle?: boolean
    // isDate?: boolen
  },
  {
    title: "Actions",
    type: COLTYPE.ACTION,
    field: "actions",
    btn:{
      // view: true,
      edit: true,
      delete: true
    }
    // amtFormat?: boolean,
    // isTitle?: boolean
    // isDate?: boolen
  },
]

export const FormUiDisplayCol: string[] = [
  "pageName",
  "simpleTest",
  "actions",
]