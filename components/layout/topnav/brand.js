import PropTypes from "prop-types"
import { Typography, Toolbar, Hidden } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Link from "components/link"

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "500",
        color: "white",
        flexGrow: 1,
    },
    personLogo: {
        height: theme.typography.h2.fontSize,
        marginRight: theme.spacing(.5),
        maxHeight: "100%",
    },
    toolbar: {
        padding: 0,
        flexGrow: 1,
    },
}))

export default function Brand({organization}) {
    const classes = useStyles()
    return (
        <Toolbar className={classes.toolbar}>
            <a href="https://risenutrition.org">
                <img className={classes.personLogo} src="/static/images/person.png"/>
            </a>
            <Link prefetch href="/">
                <div>
                    <Typography className={classes.title} color="inherit" variant="h5">Rise Nutrition</Typography>
                    <Hidden smDown>
                        <Typography className={classes.title} color="inherit">{organization}</Typography>
                    </Hidden>
                </div>
            </Link>
        </Toolbar>
    )
}

Brand.propTypes = {
    organization: PropTypes.string.isRequired,
}