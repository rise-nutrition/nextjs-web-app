import PropTypes from "prop-types"
import {
    ResponsiveContainer
} from "recharts"
import { Paper, Typography } from "@material-ui/core"

const HEIGHTS = {
    "xl": "25rem",
    "lg": "20rem",
    "md": "15rem",
    "sm": "10rem",
    "xs": "5rem"
}

export default function ChartWrapper({children, title, size, contained, style, ...props}) {
    const internal = (
        <div style={{overflowX: "auto", padding: "1em 1em 1em 0", width: "99%", maxWidth: "100%", maxHeight: "100%", height: HEIGHTS[size] || "lg", ...style}} {...props}>
            { title ? <Typography style={{width: "100%", margin: "0 auto", textAlign: "center"}}>{title}</Typography> : null}
            <ResponsiveContainer height="95%" width="99.9%">
                {children}
            </ResponsiveContainer>
        </div>
    )
    return contained ? <Paper>{internal}</Paper> : internal
}

ChartWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    contained: PropTypes.bool,
    title: PropTypes.string,
    size: PropTypes.string.isRequired,
    style: PropTypes.object,
}