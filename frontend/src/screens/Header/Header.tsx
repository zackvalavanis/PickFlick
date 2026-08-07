import { useState } from "react"
import { Drawer, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router";


export function Header() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  const items = [
    { text: "Home", path: "/" },
    { text: "Movies", path: "/movies" },
    { text: "Watchlist", path: "/watchlist" },
    ...(user
      ? [{ text: "Profile", path: "/profile" }, { text: "Logout", path: "/logout" }]
      : [{ text: "Login", path: "/login" }, { text: "Sign Up", path: "/signup" }]),
  ]


  const DrawerList = (
    <List>
      {items.map(({ text, path }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(path)
              setOpen(false)
            }}
            sx={{
              color: "#c2bcbc",
              "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ fontSize: 40, color: "#c2bcbc", "&:hover": { color: "#fff" } }} ></MenuIcon></Button>
      <Drawer
        open={open}
        disableScrollLock
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1a1a1a",
            width: 260,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  )
}