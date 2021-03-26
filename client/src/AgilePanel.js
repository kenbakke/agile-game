import React, { useState } from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from "@material-ui/core/Paper"
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(1),
        minWidth: "min-content"
    },
    details: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
}))

export const AgilePanel = ({ moveCard, addIcon, deck, name }) => {
    const classes = useStyles()
    const [currentIndex, setCurrentIndex] = useState(0)

    return <div className={classes.root}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <div >
                    {name}
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {deck.length > 0 && <div className={classes.details} width="100%">
                    <IconButton onClick={e => {
                        if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1)
                        }
                    }}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Paper>
                        <img src={deck[currentIndex].card} width="600" />
                    </Paper>
                    <IconButton onClick={e => {
                        if (currentIndex + 1 < deck.length) {
                            setCurrentIndex(currentIndex + 1)
                        }
                    }}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                    <IconButton onClick={e => {
                        if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1)
                        }
                        moveCard(deck[currentIndex].id)
                    }}>
                        {addIcon ? <AddIcon /> : <RemoveIcon />}
                    </IconButton>
                </div>}
            </AccordionDetails>
        </Accordion>
    </div>
}
