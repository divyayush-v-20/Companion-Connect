export default function AdminPage(){
    const userName = localStorage.getItem("currentUserName");
    const isAdmin = localStorage.getItem("isAdmin") == 'true';
    if(isAdmin){
        return(
            <>
                Hey {userName} , welcome to the Admin Page
            </>
        )
    }
    else{
        return(
            <>
                Unauthorized Access
            </>
        )
    }
}