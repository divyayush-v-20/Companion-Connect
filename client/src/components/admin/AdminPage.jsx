export default function AdminPage(){
    const userName = localStorage.getItem("currentUserName");
    return(
        <>
            <h1>Hey {userName}, welcome to the Admin Page</h1>
        </>
    )
}