import { Fragment, useState } from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import UserIcon from "@material-ui/icons/AccountCircle"

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <Fragment>
            <IconButton color="inherit" aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
                <UserIcon />
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                transformOrigin={{vertical: -65, horizontal: "center"}}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}