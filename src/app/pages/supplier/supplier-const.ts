export const supplierCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Supplier Name",
        type: "field",
        field: "supplierName"
    },
    {
        title: "Supplier Address",
        type: "field",
        field: "supplierAddress"
    },
    {
        title: "Supplier Phone No",
        type: "field",
        field: "supplierPhoneno"
    },
    {
        title: "Description",
        type: "field",
        field: "description"
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
export const supplierDisplayCol: string[] = [
    "no",
    "supplierName",
    "supplierAddress",
    "supplierPhoneno",
    "description",
    "actions"

]