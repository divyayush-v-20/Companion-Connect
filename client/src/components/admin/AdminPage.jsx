import { useEffect } from "react";
export default function AdminPage(){

    useEffect(() => {
        getAdminInfo();
    })

    const getAdminInfo = async () => {
        const email = localStorage.getItem("currentUserEmail");
        console.log(email);
        const dbRes = await fetch(`http://localhost:8000/admin/auth/${email}`,{
            method: 'GET',
        })
        const auth = await dbRes.json();
        console.log(auth.isAdmin);
    }
}