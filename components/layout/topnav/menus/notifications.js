import { Fragment, useState } from "react"
import { IconButton, Badge, Menu, MenuItem } from "@material-ui/core"
import NotificationsIcon from "@material-ui/icons/Notifications"

export default function NotificationsMenu() {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    return (
        <Fragment>
            <IconButton color="inherit" aria-controls="notifications-menu" aria-haspopup="true" onClick={handleClick}>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="notifications-menu"
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