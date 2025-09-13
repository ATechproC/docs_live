import logo from "../public/assets/icons/logo.svg"
import edit from "../public/assets/icons/edit.svg"
import share from "../public/assets/icons/share.svg"
import bell from "../public/assets/icons/bell.svg"
import add from "../public/assets/icons/add.svg"
import deleteIcon from "../public/assets/icons/delete.svg";
import doc from "../public/assets/icons/doc.svg"
import search from "../public/assets/icons/search.png"
import loader from "../public/assets/icons/loader.svg"

export const assets = {
    logo,
    edit,
    share,
    bell,
    add,
    deleteIcon, 
    doc,
    search,
    loader
}

export const documentsInfo: {
    id: number;
    title: string;
    createdAt: string;
}[] = 
// [];
[
        {
            id: 1,
            title: "JSM New Project Requirement",
            createdAt: "Created about 03 hours ago",
        },
        {
            id: 2,
            title: "JSM New Project Requirement",
            createdAt: "Created about 03 hours ago",
        },
];