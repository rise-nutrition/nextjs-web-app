import { makeStyles } from "@material-ui/core/styles"
import Layout from "components/layout"
import { Avatar, Button, Card, CardContent, Typography, Grid, Paper, Divider } from "@material-ui/core"

import QuickFactsTable from "components/player/quick-facts"

import LazyChart from "components/charts/lazy"

const data = [
    {name: "Page A", weight: 190, calories: 1100},
    {name: "Page B", weight: 200, calories: 2100},
    {name: "Page C", weight: 210, calories: 1300},
    {name: "Page D", weight: 197, calories: 1200},
    {name: "Page E", weight: 205, calories: 900},
    {name: "Page F", weight: 215, calories: 2100},
    {name: "Page G", weight: 216, calories: 2100},
]

const pieData = [{name: "Group A", value: 400}, {name: "Group B", value: 300},
    {name: "Group C", value: 300}, {name: "Group D", value: 200}]

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(1)
    },
    card: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
    },
    backsplash: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "1em",
    },
    divider: {
        margin: theme.spacing(2),
    },
    avatarContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    avatar: {
        border: `2px solid ${theme.palette.grey[400]}`,
        width: "150px",
        height: "150px",
    },
}))

function Player() {
    const avatar = "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3046287.png"
    const classes = useStyles()

    const pieScaling = {
        xl: .7,
        lg: .5,
        md: .8,
    }

    return (
        <Layout>
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Card className={classes.card}>
                        <CardContent className={classes.avatarContainer}>
                            <Avatar src={avatar} className={classes.avatar} />
                        </CardContent>
                        <CardContent>
                            <Typography variant="h5">Matt Milano</Typography>
                            <Typography variant="subtitle1">Linebacker</Typography>
                            <br/>
                            <Button fullWidth color="primary" variant="contained">Contact Individual</Button>
                            <Button style={{marginTop: ".3em"}} fullWidth color="secondary" variant="contained">Contact Individual&apos;s Physician</Button>
                            <Divider className={classes.divider}/>
                            <QuickFactsTable />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={9} md={6} sm={12} xs={12}>
                    <Grid container className={classes.root} spacing={1} justify="center">
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <LazyChart type="pie" contained heightScaling={pieScaling} title="Calorie Breakdown" data={pieData}/>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <LazyChart type="pie" contained heightScaling={pieScaling} title="Protein Breakdown" data={pieData}/>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <LazyChart type="pie" contained heightScaling={pieScaling} title="Carb Breakdown" data={pieData}/>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <LazyChart type="pie" contained heightScaling={pieScaling} title="Fat Breakdown" data={pieData}/>
                        </Grid>
                    </Grid>
                    <LazyChart
                        contained
                        type="area"
                        title="Weight"
                        size="xl"
                        valueFormatter={value => `${value} lbs`}
                        nameFormatter={() => "Weight"}
                        data={data}
                        areaDefs={[{dataKey: "weight", color: "purple"}]}
                    />
                    <LazyChart
                        contained
                        type="bar"
                        title="Calorie Intake"
                        size="xl"
                        valueFormatter={(value, key) => key === "weight" ? `${value} lbs` : `${value} cals`}
                        nameFormatter={(value, key) => key === "weight" ? "Weight" : "Calories"}
                        data={data}
                        areaDefs={[{dataKey: "weight", color: "green"}, {dataKey: "calories", stackId: "woo", color: "purple"}]}
                    />
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Player