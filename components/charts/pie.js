import PropTypes from "prop-types"
import {PieChart, Cell, Pie, Legend, Tooltip, ResponsiveContainer} from "recharts"
import { Paper, Typography } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const defaultScalings = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
}

const colors = [
    "#9f84bd",
    "#e6e1c5",
    "#be7c4d",
    "#395c6b",
    "#bcd3f2",
]

export default function StandardizedPieChart({
    data,
    title,
    nameKey="name",
    dataKey="value",
    color="#82ca9d",
    heightScaling={},
    hideLegend,
    contained,
    valueFormatter=value=>value,
    nameFormatter=(value, name)=>name
}) {
    const scalings = Object.assign({}, defaultScalings, heightScaling)
    const tooltipFormat = (value, name, props) => [valueFormatter(value, name, props), nameFormatter(value, name, props)]
    const isXLarge = useMediaQuery(theme => theme.breakpoints.only("xl"))
    const isLarge = useMediaQuery(theme => theme.breakpoints.only("lg"))
    const isMed = useMediaQuery(theme => theme.breakpoints.only("md"))
    const isSmall = useMediaQuery(theme => theme.breakpoints.only("sm"))
    let height = 0
    if (isXLarge) {
        height = 400 * scalings.xl || 1
    } else if (isLarge || isXLarge) {
        height = 380 * scalings.lg || 1
    } else if (isMed) {
        height = 280 * scalings.md || 1
    } else if (isSmall) {
        height = 300 * scalings.sm || 1
    } else {
        height = 360 * scalings.xs || 1
    }

    const internal = (
        <div style={{ height, }}>
            <div style={{height: "1em", width: "100%"}}></div>
            { title ? <Typography style={{width: "100%", margin: "0 auto", textAlign: "center"}}>{title}</Typography> : null}
            <ResponsiveContainer>
                <PieChart margin={{ top: 5, right: 20, bottom: 5, left: 25 }}>
                    <Pie 
                        legendType="circle" isAnimationActive={false} 
                        data={data} nameKey={nameKey} dataKey={dataKey} 
                        innerRadius={height/7} cy={height/2.5} fill={color}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]}/>
                            ))
                        }
                    </Pie>
                    <Tooltip formatter={tooltipFormat}/>
                    {!hideLegend ? <Legend layout="vertical" align="left" verticalAlign="middle"/> : null}
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
    return contained ? <Paper>{internal}</Paper> : internal
}

StandardizedPieChart.propTypes = {
    data: PropTypes.array,
    nameKey: PropTypes.string,
    dataKey: PropTypes.string,
    color: PropTypes.string,
    contained: PropTypes.bool,
    heightScaling: PropTypes.shape({
        xl: PropTypes.number,
        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,
    }),
    hideLegend: PropTypes.bool,
    valueFormatter: PropTypes.func,
    nameFormatter: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.object,
}