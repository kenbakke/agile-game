import React, { useState } from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Paper from "@material-ui/core/Paper"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(1),
        minWidth: "min-content"
    },
    table: {
        minWidth: 650,
    },
}))

export const AgileScore = ({ score }) => {
    const classes = useStyles()
    return <div className={classes.root}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <div >
                    {"Scoresheet"}
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sprint</TableCell>
                                <TableCell align="center">Story points</TableCell>
                                <TableCell align="center">Business value</TableCell>
                                <TableCell align="center">Facility Mgmt</TableCell>
                                <TableCell align="center">Line Manager</TableCell>
                                <TableCell align="center">Project A</TableCell>
                                <TableCell align="center">Project B</TableCell>
                                <TableCell align="center">Works Council</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {score().map((row) => (
                                <TableRow key={row.sprint}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.sprint}
                                    </TableCell>
                                    <TableCell align="center">{row.story}</TableCell>
                                    <TableCell align="center">{row.value}</TableCell>
                                    <TableCell align="center">{row.happiness[0]}</TableCell>
                                    <TableCell align="center">{row.happiness[1]}</TableCell>
                                    <TableCell align="center">{row.happiness[2]}</TableCell>
                                    <TableCell align="center">{row.happiness[3]}</TableCell>
                                    <TableCell align="center">{row.happiness[4]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    </div>
}
