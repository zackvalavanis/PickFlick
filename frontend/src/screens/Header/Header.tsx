import { useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import PickFlickLogo from "../../assets/pickflick-logo.svg";
import { useAuth } from "../Auth/useAuth";

export function Header() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  };

  const itemSx = {
    color: "#c2bcbc",
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(255,255,255,0.08)",
    },
  };

  return (
    <header>
      <Button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        sx={{
          minWidth: 0,
          padding: "8px",
        }}
      >
        <MenuIcon
          sx={{
            fontSize: 40,
            color: "#c2bcbc",
          }}
        />
      </Button>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#212121",
            width: 260,
          },
        }}
      >
        <List>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/")}
              sx={{
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <img
                src={PickFlickLogo}
                alt="PickFlick"
                style={{
                  height: "50px",
                  width: "auto",
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/movies")}
              sx={itemSx}
            >
              <ListItemText primary="Movies" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/watchlist")}
              sx={itemSx}
            >
              <ListItemText primary="Watchlist" />
            </ListItemButton>
          </ListItem>

          {user ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigateTo("/profile")}
                  sx={itemSx}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={itemSx}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigateTo("/login")}
                  sx={itemSx}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigateTo("/register")}
                  sx={itemSx}
                >
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </ListItem>
            </>
          )}

        </List>
      </Drawer>
    </header>
  );
}