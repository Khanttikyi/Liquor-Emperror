export interface TableCol {
  title: string,
  type: COLTYPE,
  field?: string,
  amtFormat?: boolean,
  isTitle?: boolean,
  isDate?: boolean,
  isFromatDate?: boolean,
  isActivityStatus?: boolean
  isLeadStatus?: boolean
  isAttachment?: boolean
  isProdStatus?: boolean
  isCustomerStatus?: boolean
  isQuotationDay?: boolean,
  isPolicyDay?: boolean,
  isAllowBackDate?: boolean,
  isPaymentFrequencyType?: boolean,
  isUpper?: boolean
  btn?: ViewButton,
  isStatus?: boolean
  isImg?: boolean
}

export enum COLTYPE {
  FEILD = 'field',
  TEXT = 'text',
  ACTION = 'action'
}
export interface ViewButton {
  view?: boolean,
  edit?: boolean,
  download?:boolean,
  editOnState?: boolean
  delete?: boolean
}

export const ActivityStatus = {
  "01": "Open",
  "02": "Complete",
  "03": "Cancel",
}

