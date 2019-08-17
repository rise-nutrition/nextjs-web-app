import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { 
    Drawer,
    IconButton,
    Hidden,
    Toolbar,
    Typography
} from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import Link from "components/link"

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: theme.custom.drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `${theme.spacing(7)}px !important`,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: {
        ...theme.mixins.toolbar,
        display: "flex",
        padding: `${theme.spacing(1)}px ${theme.spacing(1.3)}px`,
    },
    mobileDrawerTop: {
        padding: theme.spacing(1)
    },
    toolbar: {
        paddingLeft: theme.spacing(.8)
    },
    organization: {
        flexGrow: 1,
        textAlign: "center",
        marginRight: theme.spacing(3),
    }
}))

export default function Sidebar({ children, handleDrawerClose, open, organization }) {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.appBarSpacer}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {children}
                </Drawer>
            </Hidden>
            <Hidden mdUp>
                <Drawer anchor='top' open={open} onClose={handleDrawerClose}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <Link prefetch href="/">
                            <Typography className={classes.organization}>{organization}</Typography>
                        </Link>
                    </Toolbar>
                    {children}
                </Drawer>
            </Hidden>
        </React.Fragment>
    )
}

Sidebar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    handleDrawerClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
    organization: PropTypes.string.isRequired,
}