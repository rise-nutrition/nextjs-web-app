import PropTypes from "prop-types"
import {withRouter} from "next/router"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import DashboardIcon from "@material-ui/icons/Dashboard"

import Link from "components/link"

function Item({ name, href, router }) {
    const isActive = router.pathname === href
    return (
        <Link nav underline='none' href={href}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon color={isActive ? "primary" : "inherit"}/>
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
        </Link>
    )
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
}

export default withRouter(Item)