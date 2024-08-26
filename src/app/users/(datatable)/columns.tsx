"use client"

import { 
  ColumnDef,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { convertTime } from "@/lib/utils"
import { format, formatDate } from "date-fns"
import { Badge } from "@/components/ui/badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersProps = {
  id: number
  firstname: string
  middlename: string | null
  lastname: string 
  birthday: Date
  age: string
  gender: "M" | "F"
  email: string
  role: string
  active: "1" | "0" 
}

export const columns: ColumnDef<UsersProps>[] = [ 
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox 
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      `${row.original?.firstname} ${row.original?.middlename} ${row.original?.lastname}`
    ),
    filterFn: (row, id, filterValues) => {

			const userInfoString = [
				row.original.firstname,
				row.original.lastname,
			].filter(Boolean).join(' ').toLocaleLowerCase();

			let searchTerms = Array.isArray(filterValues) ? filterValues : [filterValues];

			// Check if any of the search terms are included in the userInfoString
			return searchTerms.some(term => userInfoString.includes(term.toLowerCase()));
		},
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender")
      return gender == "M" ? "Male" : "Female";
    },
  },
  {
    accessorKey: "age",
    header: "Age",

    /**
     * Document
     * Sorting
     */
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    cell: ({ row }) => {
      const birthday = row.original.birthday;
      return  convertTime(birthday, "short");
    },
    /**
     * Document
     * fomatting cell
     */
    // accessorKey: "amount",
    // header: () => <div className="text-right">Amount</div>,
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("amount"))
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(amount)
 
    //   return <div className="text-right font-medium">{formatted}</div>
    // },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active")
      return <Badge variant={active ? "active" : "inactive"}>{active ? "Active" : "Inactive"}</Badge>
      // return <div className={`text-${active ? 'green-500' : 'red-500'}`}>{active ? "Active" : "Inactive"}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(user.id))}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View user details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
]
