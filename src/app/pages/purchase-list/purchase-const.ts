export const purchaseCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Purchase Code",
        type: "field",
        field: "purchaseCode"
    },
    {
        title: "Voucher Code",
        type: "field",
        field: "voucherCode"
    },
    {
        title: "Brand",
        type: "field",
        field: "brandName"
    },
    {
        title: "SubBrand",
        type: "field",
        field: "subBrandName"
    },
    {
        title: "Purchase Amount",
        type: "field",
        field: "totalAmount",
        amtFormat: true,
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
export const purchaseDisplayCol: string[] = [
    "no",
    "purchaseCode",
    "voucherCode",
    "brandName",
    "subBrandName",
    "totalAmount",
    "actions"

]