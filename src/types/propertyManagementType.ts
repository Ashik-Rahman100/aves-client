export type TProperty = {
  _id?: string;
  name: string;
  type: "House" | "Apartment" | "Commercial"; // Add other types if needed
  status: "Rented" | "Available"; // Add other statuses if needed
  location: string;
  rent: number;
  owner: string;
  contact: string;
  size: string;
  checkIn: string | null | Date; // Consider using `Date` for date handling
  checkOut: string | null | Date; // Same as above
};
