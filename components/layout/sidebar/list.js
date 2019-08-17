import { Fragment } from "react"
import PropTypes from "prop-types"
import { List, ListSubheader, Divider } from "@material-ui/core"

export default function SidebarList({ children, name }) {
    return (
        <Fragment>
            <Divider/>
            <List>
                {name ? <ListSubheader inset>{name}</ListSubheader> : null}
                {children}
            </List>
        </Fragment>
    )
}

SidebarList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    name: PropTypes.string
}