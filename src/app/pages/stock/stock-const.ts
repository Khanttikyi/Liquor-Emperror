export const stockCol: any[] = [

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
        title: "Quantity",
        type: "field",
        field: "quantity",
        amtFormat: true,
    },
    {
        title: "Retail Price",
        type: "field",
        field: "retailPrice",
        amtFormat: true,
    },
    {
        title: "WholeSale Price",
        type: "field",
        field: "wholeSalePrice",
        amtFormat: true,
    },
    {
        title: "Status",
        type: "field",
        field: "status",
        amtFormat: true,
    },

    {
        title: "Action",
        type: "action",
        field: "actions",
        btn: {
            detail: true,
            
        }
    },

]
export const stockDisplayCol: string[] = [
    "no",
    "purchaseCode",
    "brandName",
    "subBrandName",
    "quantity",
    "retailPrice",
    "wholeSalePrice",
    "status",
    "actions"

]