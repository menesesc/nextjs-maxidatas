import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:any) {
  try {
  // Obtén el año, mes y día de la fecha
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por lo que se suma 1
  let day = date.getDate().toString().padStart(2, '0');

  // Concatena los valores en el formato deseado
  return `${year}${month}${day}`;
  } catch (e) {
    console.error(e)
  }
}