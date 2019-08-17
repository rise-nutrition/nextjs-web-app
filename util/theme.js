import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes"

const theme = createMuiTheme({
    custom: {
        drawerWidth: 240,
    },
    typography: {
        fontFamily: [
            "\"Roboto Slab\"",
            "\"Helvetica\"",
            "\"Arial\"",
            "sans-serif"
        ].join(","),
    },
    palette: {
        // background: {
        //     default: "#f9f9f9",
        // },
        // primary: {
        //     main: "#000000",
        //     dark: "#000000",
        //     light: "#ffffff",
        // },
        secondary: {
            main: "#48a9a6",
            contrastText: "#f6f7eb",
        },
        text: {
            
        },
    },
})

export default responsiveFontSizes(theme)
