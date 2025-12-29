export const getUserInitials = (name = "") => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/) // handle multiple spaces
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
