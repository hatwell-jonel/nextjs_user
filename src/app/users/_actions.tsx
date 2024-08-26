'use server';

import { db } from '@/db/index';
import { typeCreateSchema } from "./_validations";
import {users } from "@/db/schema";
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

const table = users;

export const createUser = async (data: typeCreateSchema) => {
    try {
        console.log(data)
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userData = {
            ...data,
            password: hashedPassword,
        };
        
        await db.insert(table).values(userData);
    
        console.log("User created successfully");
        revalidatePath('/users');

        return {
            message: "Successfully created",
            success: true,
        };

    }catch(e){
        console.error(e);
        return null;
    }
}