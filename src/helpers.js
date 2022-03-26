import stc from "string-to-color";

function getNameInitials(name) {
  const nameInitials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
  return nameInitials;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stc(name),
    },
    children: getNameInitials(name),
  };
}
