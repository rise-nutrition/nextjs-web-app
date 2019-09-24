import PropTypes from "prop-types"
import { useRouter } from "next/router"
import EnhancedTable from "components/table"

const columns = [
    { id: "avatar", numeric: false, image: true, label: "Headshot" },
    { id: "lastName", numeric: false, disablePadding: true, label: "Last Name" },
    { id: "firstName", numeric: false, label: "First Name" },
    { id: "variation", numeric: false, label: "Sport / Activity" },
    { id: "primaryRole", numeric: false, label: "Primary Role" },
    { id: "weight", numeric: true, label: "Weight (lbs)" },
    { id: "height", numeric: true, label: "Height (ft'in\")" },
    { id: "trainer", numeric: false, label: "Trainer" },
    { id: "physician", numeric: false, label: "Physician" },
]

const PlayerTable = ({ players, title }) => {
    const router = useRouter()
    return (
        <EnhancedTable 
            columns={columns} 
            rows={players || []}
            title={title || "Player List"}
            primaryID={row => `${row.id}-${row.lastName}-${row.firstName}`}
            onSingleClick={(_, row) => { router.push(`/players/${row.id}`) }}
        />
    )
}

PlayerTable.propTypes = {
    title: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PlayerTable