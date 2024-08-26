import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcrypt";

const saltRounds = 10;

// Function to hash passwords
async function hashPasswords(users : any[]) : Promise<any[]>{
  return Promise.all(users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return {
      ...user,
      password: hashedPassword, // Replace plaintext password with hashed password
    };
  }));
}



const userArray = [
  {
    firstname: "John",
    lastname: "Doe",
    middlename: "John",
    birthday: new Date("1990-01-01"),
    age: 30,
    gender: "M",
    email: "john.doe@example.com",
    password: "password",
    role: "admin",
    active: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: "Jane",
    lastname: "Doe",
    middlename: "Jane",
    birthday: new Date("1990-01-01"),
    age: 25,
    gender: "F",
    email: "jane.doe@example.com",
    password: "password",
    role: "user",
    active: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedUsers() {

  const hashedUsers = await hashPasswords(userArray);
  
    for (const userData of hashedUsers) {
      await db
        .insert(users)
        .values(userData)
        .onDuplicateKeyUpdate({
          set: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            middlename: userData.middlename,
            birthday: userData.birthday,
            age: userData.age,
            gender: userData.gender,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            active: userData.active,
            updatedAt: new Date(),
          },
        })
        .execute();
    }
  
    console.log("Seeding complete.");
  }
  
  seedUsers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });