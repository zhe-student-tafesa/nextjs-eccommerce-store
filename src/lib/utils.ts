import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// (...inputs: ClassValue[]): This is the parameter part of the function, which accepts any number of inputs of type ClassValue[]. 
// ClassValue is the type used to represent the CSS class name, which may be a string, an object, or even a Boolean value.
export function cn(...inputs: ClassValue[]) {
  // clsx(inputs) converts each item in the inputs array into a combined class name string
  return twMerge(clsx(inputs))
}
