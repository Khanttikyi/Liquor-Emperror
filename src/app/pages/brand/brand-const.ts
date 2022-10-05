export const BrandCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Category Name",
        type: "field",
        field: "categoryCode"
    },
    {
        title: "Brand",
        type: "field",
        field: "brandName"
    },
    {
        title: "Description",
        type: "field",
        field: "brandDescription"
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
export const BrandDisplayCol: string[] = [
    "no",
    "categoryCode",
    "brandName",
    "brandDescription",
    "actions"

]