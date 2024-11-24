import { z } from "zod";

export const propertyManagementSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "This field is required" }),
    type: z.enum(["House", "Apartment", "Commercial"]), // Restricts to predefined values
    status: z.enum(["Rented", "Available"]), // Restricts to predefined values
    location: z.string({ required_error: "this field is required." }),
    rent: z.number({ required_error: "This field is required" }),
    owner: z.string({ required_error: "This field is required" }),
    contact: z
      .string({ required_error: "This field is required" })
      .email("Invalid email format"), // Ensures a valid email format
    size: z.string({ required_error: "This field is required" }),
    checkIn: z
      .string({})
      .nullable()
      .refine((date) => date === null || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }), // Ensures the string is a valid date
    checkOut: z
      .string()
      .nullable()
      .refine((date) => date === null || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }), // Ensures the string is a valid date
  }),
});
