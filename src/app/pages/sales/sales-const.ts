export const saleItemCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Voucher No",
        type: "field",
        field: "saleVoucherCode"
    },
    {
        title: "Sale Date",
        type: "field",
        field: "saledate"
    },

    {
        title: "Action",
        type: "action",
        field: "actions",
        btn: {
            edit: true,
            delete: true
        }
    },

]
export const SaleItemDisplayCol: string[] = [
    "no",
    "saleVoucherCode",
    "saledate",
   
    "actions"

]