import PropTypes from "prop-types"
import clsx from "clsx"
import { lighten, makeStyles } from "@material-ui/core/styles"
import { 
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
    Avatar,
} from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete"
import ViewListIcon from "@material-ui/icons/ViewList"
import ListIcon from "@material-ui/icons/List"

  
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}
  
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}
  
function getSorting(order, orderBy) {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}
  
function EnhancedTableHead({ 
    columns,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    bulkMode,
}) {
    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }
  
    return (
        <TableHead>
            <TableRow>
                { bulkMode ? (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ "aria-label": "select all desserts" }}
                        />
                    </TableCell>
                ) : null}
                {columns.map((col, colIndex) => {
                    const overrideDisabledPadding = !bulkMode && (colIndex === 0 || colIndex === columns.length - 1)
                    return (
                        <TableCell
                            key={col.id}
                            align={col.numeric ? "right" : "left"}
                            padding={!overrideDisabledPadding && col.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === col.id ? order : false}
                        >
                            {
                                col.image || col.disableSorting ? (
                                    col.label
                                ) : (
                                    <TableSortLabel
                                        active={orderBy === col.id}
                                        direction={order}
                                        onClick={createSortHandler(col.id)}
                                    >
                                        {col.label}
                                        {orderBy === col.id ? (
                                            <span className={classes.visuallyHidden}>
                                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                )
                            }
                        </TableCell>
                    )}
                )}
            </TableRow>
        </TableHead>
    )
}
  
EnhancedTableHead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        disablePadding: PropTypes.bool,
    })),
    bulkMode: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}
  
const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
        flex: "1 1 100%",
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: "0 0 auto",
    },
}))
  
const EnhancedTableToolbar = ({ numSelected, title, bulkMode, onToggleBulkMode }) => {
    const classes = useToolbarStyles()
    const selectedBar = bulkMode && numSelected > 0
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selectedBar,
            })}
        >
            <div className={classes.title}>
                {selectedBar ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        {title} {bulkMode && "(Bulk Mode)"}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <Toolbar className={classes.actions}>
                {selectedBar ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
                <Tooltip title="Bulk Select Mode">
                    <IconButton onClick={onToggleBulkMode} aria-label="bulk mode">
                        { bulkMode ? <ListIcon /> : <ViewListIcon /> }
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </Toolbar>
    )
}
  
EnhancedTableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    bulkMode: PropTypes.bool,
    onToggleBulkMode: PropTypes.func,
    numSelected: PropTypes.number.isRequired,
}
  
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: "auto",
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}))
  
function EnhancedTable({ columns, rows, title, primaryID="id", onSingleClick=()=>{} }) {
    const classes = useStyles()
    const [isBulkMode, setBulkMode] = React.useState(false)
    const [order, setOrder] = React.useState("asc")
    const [orderBy, setOrderBy] = React.useState("calories")
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const rowToPrimaryIDFunc = (row, index) => {
        if (primaryID && {}.toString.call(primaryID) === "[object Function]") {
            return primaryID(row, index)
        }
        return row[primaryID]
    }

    const toggleBulkMode = () => {
        setBulkMode(!isBulkMode)
    }
  
    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === "desc"
        setOrder(isDesc ? "asc" : "desc")
        setOrderBy(property)
    }
  
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(rowToPrimaryIDFunc)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }
  
    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []
  
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
  
        setSelected(newSelected)
    }
  
    function handleChangePage(event, newPage) {
        setPage(newPage)
    }
  
    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
  
    const isSelected = name => selected.indexOf(name) !== -1
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  
    return (
        <Paper className={classes.paper}>
            <EnhancedTableToolbar 
                title={title}
                numSelected={selected.length}
                bulkMode={isBulkMode}
                onToggleBulkMode={toggleBulkMode}
            />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        columns={columns}
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        bulkMode={isBulkMode}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const key = rowToPrimaryIDFunc(row, index)
                                const isItemSelected = isSelected(key)
                                const labelId = `enhanced-table-checkbox-${key}`
  
                                return (
                                    <TableRow
                                        hover
                                        onClick={isBulkMode ? event => handleClick(event, key) : (e) => onSingleClick(e, row)}
                                        role={isBulkMode ? "checkbox" : ""}
                                        aria-checked={isBulkMode ? {isItemSelected} : undefined}
                                        tabIndex={-1}
                                        key={key}
                                        selected={isBulkMode ? isItemSelected : false}
                                    >
                                        {isBulkMode ? (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ "aria-labelledby": labelId }}
                                                />
                                            </TableCell>
                                        ) : null}
                                        {columns.map((col, colIndex) => {
                                            const overrideDisabledPadding = !isBulkMode && (colIndex === 0 || colIndex === columns.length - 1) 
                                            return (
                                                <TableCell 
                                                    component={index === 0 ? "th" : undefined}
                                                    scope={index === 0 ? "row" : ""}
                                                    padding={!overrideDisabledPadding && col.disablePadding ? "none" : "default"}
                                                    align={col.numeric ? "right" : "left"}
                                                    key={`${key}-${col.id}`}
                                                >
                                                    {
                                                        col.image ? (
                                                            <Avatar src={row[col.id]}/>
                                                        ) : row[col.id]
                                                    }
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={columns.length + 1} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "previous page",
                }}
                nextIconButtonProps={{
                    "aria-label": "next page",
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

EnhancedTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        disablePadding: PropTypes.bool,
    })),
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    primaryID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]).isRequired,
    onSingleClick: PropTypes.func,
}
  

export default EnhancedTable