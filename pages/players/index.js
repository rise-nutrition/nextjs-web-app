import { useState, Fragment } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper, Divider } from "@material-ui/core"

import Layout from "components/layout"
import PlayerTable from "components/player/table"
import MultiSelect from "components/data/multi-select"


const rows = [
    {
        firstName: "Josh", lastName: "Allen",
        id: 17, primaryRole: "Quarterback",
        trainer: "Joe Smithy",
        physician: "Debora Luongo",
        height: "6'0\"",
        weight: "220",
        variation: "Football",
        avatar: "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png&w=350&h=254"
    },
    {
        firstName: "Josh", lastName: "Greenie",
        id: 17, primaryRole: "Center Guard",
        trainer: "Jackson Pollick",
        physician: "BoJack Horseman",
        height: "6'0\"",
        weight: "230",
        variation: "Football",
        avatar: "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png&w=350&h=254"
    },
    {
        firstName: "Julio", lastName: "Jones",
        trainer: "Joe Smithy",
        physician: "Joe Kyle",
        height: "6'3\"",
        weight: "190",
        variation: "Football",
        avatar: "http://a.espncdn.com/i/headshots/nfl/players/full/13982.png",
        id: 22, primaryRole: "Wide Reciever",
    },
    {
        firstName: "Tom", lastName: "Brady",
        id: 12, primaryRole: "Quarterback",
        trainer: "Joe Smithy",
        physician: "Debora Luongo",
        height: "5'9\"",
        weight: "185",
        variation: "Football",
        avatar: "http://cdn.c.photoshelter.com/img-get/I0000oknHgDsNHs8/s/880/880/stock-photo-clown-circus-1040.jpg"
    },
]


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(1)
    },
    filterPaper: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
    }
}))

const fieldsToFilterOn = [
    {
        field: "firstName",
        name: "First Name"
    },
    {
        field: "lastName",
        name: "Last Name"
    },
    {
        field: "primaryRole",
        name: "Role"
    },
    {
        field: "trainer",
        name: "Trainer Name"
    },
    {
        field: "physician",
        name: "Physician"
    },
]

const Players = () => {
    const classes = useStyles()
    const filterState = fieldsToFilterOn.map(fieldInfo => {
        let [state, setter] = useState([])
        return { ...fieldInfo, state, setter }
    })
    let filteredRows = filterState.reduce(
        (filteredRows, filter) => (
            filteredRows.filter(
                player => filter.state.length === 0 || filter.state.some(val => val.value === player[filter.field])
            )
        ), rows
    )

    return (
        <Layout>
            <Grid container className={classes.root} spacing={2}>
                <Grid item lg={3} md={6} sm={12} xs={12}>
                    <Paper  className={classes.filterPaper}>
                        {
                            filterState.map(filter => (
                                <Fragment key={filter.field}>
                                    <MultiSelect
                                        onChange={filter.setter}
                                        options={rows.reduce((helper, value) => {
                                            const optionValue = value[filter.field]
                                            if (!helper.seen.has(optionValue)) {
                                                helper.seen.add(optionValue)
                                                helper.options.push({ label: optionValue, value: optionValue })
                                            }
                                            return helper
                                        }, {seen: new Set(), options: []}).options}
                                        label={filter.name} placeholder={`Filter ${filter.name}`}
                                    />
                                    <br /><br />
                                </Fragment>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid item lg={9} md={6} sm={12} xs={12}>
                    <PlayerTable players={filteredRows}/>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Players