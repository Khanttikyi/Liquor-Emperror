export interface FormUI {
  id?: any
  dyProductID?:any
  pageName?: string
  config?: string
  simpleTest?: string
  type?: string
  table?: TableObj[]
}
export interface TableObj{
  tableName: string
  cols: ColObj[]
}
export interface ColObj{
  name: string
  type: string
}