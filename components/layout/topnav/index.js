import PropTypes from "prop-types"
import clsx from "clsx"
import withWidth, { isWidthUp } from "@material-ui/core/withWidth"
import { makeStyles } from "@material-ui/core/styles"

import {
    AppBar,
    IconButton,
    Grow,
    Toolbar,
} from "@material-ui/core"

import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingLeft: theme.spacing(2.2),
        paddingRight: 0, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: theme.custom.drawerWidth,
        width: `calc(100% - ${theme.custom.drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    contentToolbar: {
        flexGrow: 1,
        padding: 0,
    }
}))

function TopNav({ children, handleDrawerOpen, open, ...props }) {
    const classes = useStyles()
    const ignoreDrawerMovements = isWidthUp("md", props.width)
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, (open && ignoreDrawerMovements) && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <Grow in={!open || !ignoreDrawerMovements} timeout={300}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Grow>
                <Toolbar className={classes.contentToolbar}>
                    {children}
                </Toolbar>
            </Toolbar>
        </AppBar>
    )
}

TopNav.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    handleDrawerOpen: PropTypes.func.isRequired,
    open: PropTypes.bool,
    width: PropTypes.string,
}

export default withWidth()(TopNav)