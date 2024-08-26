
import { DataTable } from "./(datatable)/data-table";
import { columns } from "./(datatable)/columns";
import { db } from "@/db";
import { users } from "@/db/schema";


async function getUsersData(){

  // model query
  // const usersq = await db.query.users.findMany();
  const userData = await db.select({
    id: users.id,
    firstname: users.firstname,
    middlename: users.middlename,
    lastname: users.lastname,
    birthday: users.birthday,
    age: users.age,
    gender: users.gender,
    email: users.email,
    password: users.password,
    role: users.role,
    active: users.active,
  }).from(users);
  return userData;

}

export const UsersTable = async () => {

  const data = await getUsersData()
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  )
}