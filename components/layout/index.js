
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"
import {
    Container,
    Typography,
} from "@material-ui/core"

import Link from "components/link"
import NotificationsMenu from "components/layout/topnav/menus/notifications"
import UserMenu from "components/layout/topnav/menus/user"

import Actions from "components/layout/topnav/actions"
import Brand from "components/layout/topnav/brand"
import TopNav from "components/layout/topnav"
import Sidebar from "components/layout/sidebar"
import SidebarList from "components/layout/sidebar/list"
import Item from "components/layout/sidebar/item"
import { Fragment } from "react"

const organization = "New York Dynamic Sports Trainers"

const mainListItems = (
    <Fragment>
        <SidebarList>
            <Item name="Dashboard" href="/"/>
            <Item name="About" href="/about"/>
        </SidebarList>
        <SidebarList name="Team">
            <Item name="Player" href="/player"/>
        </SidebarList>
    </Fragment>
)

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

export default function Layout({title, children}) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            {title ? <Helmet><title>{title} | Rise Nutrition</title></Helmet> : null}
            <TopNav open={open} handleDrawerOpen={handleDrawerOpen}>
                <Brand organization={organization}/>
                <Actions>
                    <NotificationsMenu />
                    <UserMenu />
                </Actions>
            </TopNav>
            <Sidebar 
                open={open}
                handleDrawerClose={handleDrawerClose}
                organization={organization}
            >
                {mainListItems}
            </Sidebar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    {children}
                </Container>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <Link style={{textDecoration: "none"}} naked color="primary" href="https://www.risenutrition.org">
                        Rise Nutrition
                    </Link>{"  "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.string,
}