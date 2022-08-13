export const categoryCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "Category",
        type: "field",
        field: "categoryName"
    },
    {
        title: "Description",
        type: "field",
        field: "categoryDescription"
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
export const CategoryDisplayCol: string[] = [
    "no",
    "categoryName",
    "categoryDescription",
    "actions"

]