import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toZonedTime, format as formatDate  } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertTime(
  dateString: string | Date, 
  formatType: 'full' | 'short' | 'yearOnly' = 'full', 
  targetTimeZone: string = "Asia/Manila"
) {
   // Parse the input date string to a Date object
   const date = new Date(dateString);

  // Convert the date to the target time zone
  const zonedTime = toZonedTime(date, targetTimeZone);

   // Determine the format string based on formatType
   let formatString: string;
   switch (formatType) {
     case 'short':
       formatString = 'MMM dd, yyyy'; // e.g., Jan 01, 2025
       break;
     case 'yearOnly':
       formatString = 'MM/dd/yyyy'; // e.g., 01/01/25
       break;
     case 'full':
     default:
       formatString = 'MMMM dd, yyyy'; // e.g., January 01, 2024
       break;
   }

  // Format the date in the target time zone
  const formattedDate = formatDate(zonedTime, formatString, { timeZone: targetTimeZone });
  return formattedDate;
}