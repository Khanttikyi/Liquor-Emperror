export const userCol: any[] = [

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
        title: "User Phone ",
        type: "field",
        field: "userPhone"
    },
    {
        title: "Email ",
        type: "field",
        field: "userEmail"
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
export const UserDisplayCol: string[] = [
    "no",
    "userName",
    "userPhone",
    "userEmail",
    "actions"

]