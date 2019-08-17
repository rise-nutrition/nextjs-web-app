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
        case "bar":
            Component = dynamic(() => import("./bar"))
    }
    return (
        <Component {...props}/>
    )
}