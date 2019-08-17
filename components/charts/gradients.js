const GRADIENTS = {
    green: {
        stroke: "#82ca9d",
        gradient: (
            <linearGradient key="green" id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
        ),
    },
    purple: {
        stroke: "#8884d8",
        gradient: (
            <linearGradient key="purple" id="purple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
        ),
    }
}

function getGradientsFromDefs(areaDefs) {
    const colors = Array.from(new Set(areaDefs.map(areaDef => {
        let color = areaDef.color || "purple"
        if (!GRADIENTS[color]) {
            color = "purple"
        }
        return color
    })))
    return colors.reduce((accum, color) => {
        if (!GRADIENTS[color]) { return }
        accum[color] = GRADIENTS[color]
        return accum      
    }, {})
}

export {
    GRADIENTS,
    getGradientsFromDefs
}