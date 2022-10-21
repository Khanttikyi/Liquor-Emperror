export const userRoleCol: any[] = [

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
export const UserRoleDisplayCol: string[] = [
    "no",
    "categoryName",
    "categoryDescription",
    "actions"

]