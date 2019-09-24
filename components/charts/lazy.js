import PropTypes from "prop-types"
import dynamic from "next/dynamic"

// const BarChart = 
// const AreaChart = 
// const PieChart = 

export default function LazyChart({ type, ...props }) {
    let Component = null
    switch (type) {
    case "pie":
        Component = dynamic(() => import("./pie"))
        break
    case "area":
        Component = dynamic(() => import("./area"))
        break
    case "bar":
        Component = dynamic(() => import("./bar"))
    }
    return (
        <Component {...props}/>
    )
}

LazyChart.propTypes = {
    type: PropTypes.oneOf([
        "pie",
        "area",
        "bar"
    ]).isRequired
}