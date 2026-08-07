import { useState } from "react"
import { Drawer, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';


export function Header() {
  const [open, setOpen] = useState(false)



  const DrawerList = (
    <List>
      {["Home", "Movies", "Watchlist"].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
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