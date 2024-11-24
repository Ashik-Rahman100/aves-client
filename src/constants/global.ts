export const propertyType = ["House", "Apartment", "Commercial"];
export const propertyStatus = ["Rented", "Available"];

export const propertyTypeOptions = propertyType.map((item) => ({
  value: item,
  label: item,
}));
export const propertyStatusOptions = propertyStatus.map((item) => ({
  value: item,
  label: item,
}));
