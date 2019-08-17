import { Table, TableBody, TableCell, TableRow } from "@material-ui/core"


export default function QuickFactsTable() {
    return (
        <Table size="small">
            <TableBody>
                <TableRow key="weight">
                    <TableCell component="th" scope="row">Weight</TableCell>
                    <TableCell align="right">223 lbs</TableCell>
                </TableRow>
                <TableRow key="height">
                    <TableCell component="th" scope="row">Height</TableCell>
                    <TableCell align="right">6&apos;0&#34; ft</TableCell>
                </TableRow>
                <TableRow key="blah">
                    <TableCell component="th" scope="row">Physician</TableCell>
                    <TableCell align="right">Doctor John Schmitt</TableCell>
                </TableRow>
                <TableRow key="asf">
                    <TableCell component="th" scope="row">Physician Phone</TableCell>
                    <TableCell align="right">(555) 555 - 5555</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}