import styled from "@mui/material/styles/styled";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== "isOnline",
})(({ theme, isOnline }) => ({
  "& .MuiBadge-badge": {
    ...(!isOnline && {
      backgroundColor: `${theme.palette.error.dark}`,
      color: `${theme.palette.error.dark}`,
    }),
    ...(isOnline && {
      backgroundColor: `${theme.palette.success.light}`,
      color: `${theme.palette.success.light}`,
    }),

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  ...(isOnline && {
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }),
}));

export default StyledBadge;
