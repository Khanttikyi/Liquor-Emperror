export const userRoleCol: any[] = [

    {
        title: "No",
        type: "field",
        field: "no",
        isNo: true
    },
    {
        title: "User Name",
        type: "field",
        field: "userName"
    },
    {
        title: "User Role",
        type: "field",
        field: "userRole"
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
    "userName",
    "userRole",
    "actions"

]