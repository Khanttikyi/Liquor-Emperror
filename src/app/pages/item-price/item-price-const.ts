export const itempriceCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Brand Name",
        type: "field",
        field: "brandName"
    },
    {
        title: "Item Name",
        type: "field",
        field: "subBrandName"
    },
    {
        title: "Size",
        type: "field",
        field: "size"
    },
    
    {
        title: "Retail Price",
        type: "field",
        field: "retailPrice"
    },
    {
        title: "WholeSale Price",
        type: "field",
        field: "wholeSalePrice"
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
export const ItemPriceDisplayCol: string[] = [
    "no",
    "brandName",
    "subBrandName",
    "size",
    "retailPrice",
    "wholeSalePrice",
    
    "actions"

]