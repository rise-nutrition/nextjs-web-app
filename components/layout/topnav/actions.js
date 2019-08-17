import PropTypes from "prop-types"
import { Toolbar } from "@material-ui/core"

export default function Actions({ children }) {
    return (
        <Toolbar>
            {children}
        </Toolbar>
    )
}

Actions.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}