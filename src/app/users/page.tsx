import Link from "next/link";
import {  UserForm } from "./_client";
import { UsersTable } from "./_server";


const UsersPage = async () => {
    return ( 
        <div>
            <Link href="/"> Back</Link>
            {/* <UserForm /> */}
            <UsersTable />
        </div>
     );
}
 
export default UsersPage;