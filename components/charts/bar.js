import PropTypes from "prop-types"
import {
    BarChart,
    Bar,
    Brush,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

import ChartWrapper from "./wrapper"
import { getGradientsFromDefs } from "./gradients"

export default function StandardizedBarChart({ data, areaDefs, valueFormatter=value=>value, nameFormatter=(value, name)=>name, ...props }) {
    const tooltipFormat = (value, name, props) => [valueFormatter(value, name, props), nameFormatter(value, name, props)]
    const gradientsMap = getGradientsFromDefs(areaDefs)
    const gradients = Object.keys(gradientsMap).map(color => gradientsMap[color].gradient)
    return (
        <ChartWrapper {...props}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip formatter={tooltipFormat}/>
                <Legend formatter={nameFormatter}/>
                <Brush dataKey='name' height={30} stroke="#8884d8"/>
                <defs>
                    { gradients }
                </defs>
                {
                    areaDefs.map((areaDef, i) => {
                        let color = areaDef.color || "purple"
                        if (!gradientsMap[color]) {
                            color = "purple"
                        }
                        return (
                            <Bar key={i} type='monotone' 
                                dataKey={areaDef.dataKey} stackId={areaDef.stackId || "default"} stroke={gradientsMap[color].stroke} fillOpacity={1} fill={`url(#${color})`}
                            />
                        )
                    })
                }
            </BarChart>
        </ChartWrapper>
    )
}

StandardizedBarChart.propTypes = {
    data: PropTypes.array.isRequired,
    areaDefs: PropTypes.arrayOf(PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        color: PropTypes.string,
    })),
    valueFormatter: PropTypes.func,
    nameFormatter: PropTypes.func,
    title: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object,
}