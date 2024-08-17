import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./Common.scss";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../redux/Slices/AuthSlice";
import { DARK_GREEN, WHITE } from "../../utils/constants";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: DARK_GREEN,
          color: WHITE,
        },
      },
    },
  },
});

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutHandler());
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (menuItem) => {
    return location.pathname.includes(menuItem.text);
  };

  const userData = JSON.parse(localStorage.getItem("user"));

  const menuItems =
    userData.title === "EMPLOYEE"
      ? [
          {
            name: "Bike Assembly",
            to: "/admin/bike-assembly/all",
            text: "/admin/bike-assembly/all",
            icon: (
              <ListItemIcon>
                <PeopleAltIcon
                  sx={{
                    color: isActive({ text: "/admin/bike-assembly/all" })
                      ? DARK_GREEN
                      : WHITE,
                    fontSize: 30,
                  }}
                />
              </ListItemIcon>
            ),
          },
        ]
      : [
          {
            name: "Admin",
            to: "/admin/admin-user/all",
            text: "/admin/admin-user/all",
            icon: (
              <ListItemIcon>
                <ManageAccountsIcon
                  sx={{
                    color: isActive({ text: "/admin/admin-user/all" })
                      ? DARK_GREEN
                      : WHITE,
                    fontSize: 30,
                  }}
                />
              </ListItemIcon>
            ),
          },
          {
            name: "Employee",
            to: "/admin/employee/all",
            text: "/admin/employee/all",
            icon: (
              <ListItemIcon>
                <ManageAccountsIcon
                  sx={{
                    color: isActive({ text: "/admin/employee/all" })
                      ? DARK_GREEN
                      : WHITE,
                    fontSize: 30,
                  }}
                />
              </ListItemIcon>
            ),
          },
          {
            name: "Bike",
            to: "/admin/bike/all",
            text: "/admin/bike/all",
            icon: (
              <ListItemIcon>
                <PeopleAltIcon
                  sx={{
                    color: isActive({ text: "/admin/bike/all" })
                      ? DARK_GREEN
                      : WHITE,
                    fontSize: 30,
                  }}
                />
              </ListItemIcon>
            ),
          },
          {
            name: "Bike Assembly",
            to: "/admin/bike-assembly/all",
            text: "/admin/bike-assembly/all",
            icon: (
              <ListItemIcon>
                <PeopleAltIcon
                  sx={{
                    color: isActive({ text: "/admin/bike-assembly/all" })
                      ? DARK_GREEN
                      : WHITE,
                    fontSize: 30,
                  }}
                />
              </ListItemIcon>
            ),
          },
        ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="Layout__container">
        <CssBaseline />
        <AppBar
          position="absolute"
          open={true}
          className="Layout__header__container"
        >
          <Toolbar className="Layout__header__toolbar">
            <Typography
              component="h1"
              variant="h6"
              align="center"
              noWrap
              className="Layout__header__logo__container"
            >
              Bike Assembly
            </Typography>
            <AccountBoxIcon />
            <Typography padding={2}>
              {`${userData?.firstName}${
                userData?.lastName ? " " + userData?.lastName : ""
              }`}
            </Typography>
            <IconButton color="inherit" onClick={logoutUser}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={true} className="Layout__drawer">
          <Toolbar>
            <div
              className="Layout__home__icon__container"
              onClick={() => navigate("/login")}
            >
              {/* <img
                src={""}
                alt=""
                height="30px"
                className="Layout__home__icon"
              /> */}
              Logo
            </div>
          </Toolbar>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item?.name}
                component={Link}
                to={item.to}
                sx={{ backgroundColor: isActive(item) ? WHITE : "" }}
              >
                {item.icon}
                <ListItemText
                  primary={item.name}
                  sx={{ color: isActive(item) ? DARK_GREEN : WHITE }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" className="Layout__main__component__container">
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
