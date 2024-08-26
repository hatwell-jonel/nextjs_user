'use client';

import React, { useTransition } from "react";
import bcrypt from 'bcrypt';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUser } from "./_actions";
import { formSchema, typeCreateSchema} from "./_validations";
import { toast } from 'sonner';

export const UserForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<typeCreateSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            birthday: new Date(),
            age: "1",
            gender: "M",
            email: "",
            password: "",
            role: "admin",
            active: 1,
        },
    })

    function onSubmit(values: typeCreateSchema) {
        startTransition(async () => {
            const result = await createUser(values);

            if(result?.success === false){
              form.reset();
            }

            toast.success(result?.message, {
              position: "top-right",
              style: {
                backgroundColor: '#D1FFBD',
                color: '#000',
                fontWeight: 'bold',
              },
            });
        })
    }

    return (
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white mx-auto my-10 flex flex-col gap-3 border shadow-md rounded-md p-8 w-[400px]">
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firstname <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="middlename"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Middlename</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ""}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
        
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input   {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth <span className="text-red-500" >*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />


              <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role <span className="text-red-500">*</span></FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active <span className="text-red-500">*</span></FormLabel>
                    <Select 
                      onValueChange={(value : any) => field.onChange(value === 1)} 
                      defaultValue={field.value ? "1" : "0"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

                
               <Button type="submit" disabled={isPending} className="w-full mt-5">
                    Submit{isPending && "ting"}
                </Button>
            </form>
        </Form>
    )
}


