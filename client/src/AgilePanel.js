import React, { useState } from "react";
import * as R from "ramda"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from "@material-ui/core/Paper"
import RemoveIcon from '@material-ui/icons/Remove';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { makeStyles } from '@material-ui/core/styles';
import { deprecatedPropType } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
    },
    details: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    header: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    root: {
        width: "100%",
        padding: theme.spacing(1),
        minWidth: "min-content"
    },
    slider: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(2),
        width: 300,
    },
}))

const imageSliderPos = (min, max, size) => ((size - min) * 100) / (max - min)
const imageSize = (min, max, value) => ((max - min) * value) / 100 + min

const ImageSlider = ({ min, max, size, setSize, classes }) => <div className={classes.sliderContainer}>
    <div className={classes.slider}>
        <Grid container spacing={2}>
            <Grid item>
                <ZoomOutIcon />
            </Grid>
            <Grid item xs>
                <Slider value={imageSliderPos(min, max, size)} onChange={(event, value) => setSize(imageSize(min, max, value))} />
            </Grid>
            <Grid item>
                <ZoomInIcon />
            </Grid>
        </Grid>
    </div>
</div>

const Card = ({ currentIndex, setCurrentIndex, deck, moveCard, gridView, imageSize, addIcon, classes }) => <div className={classes.card} >
    {!gridView && <IconButton onClick={e => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }}>
        <KeyboardArrowLeftIcon />
    </IconButton>}
    <Paper>
        <img src={deck[currentIndex].card} width={imageSize} />
    </Paper>
    {!gridView && <IconButton onClick={e => {
        if (currentIndex + 1 < deck.length) {
            setCurrentIndex(currentIndex + 1)
        }
    }}>
        <KeyboardArrowRightIcon />
    </IconButton>}
    <IconButton onClick={e => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
        moveCard(deck[currentIndex].id)
    }}>
        {addIcon ? <AddIcon /> : <RemoveIcon />}
    </IconButton>
</div>

export const AgilePanel = ({ moveCard, addIcon, deck, name }) => {
    const classes = useStyles()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [gridView, setGridView] = useState(false)
    const [singleImageSize, setSingleImageSize] = useState(600)
    const [gridImageSize, setGridImageSize] = useState(400)

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
                <div className={classes.detailsContainer}>
                    <div className={classes.header} width="100%">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={gridView}
                                        onChange={e => setGridView(!gridView)}
                                        name="gridViewCheck"
                                        color="primary"
                                    />
                                }
                                label="Grid View"
                            />
                            <FormControlLabel
                                control={
                                    gridView ?
                                        <ImageSlider {...{ min: 200, max: 800, size: gridImageSize, setSize: setGridImageSize, classes }} /> :
                                        <ImageSlider {...{ min: 300, max: 1200, size: singleImageSize, setSize: setSingleImageSize, classes }} />
                                }
                                label="Image Size"
                            />
                        </FormGroup>
                    </div>
                    {deck.length > 0 && <div className={classes.details} width="100%">
                        {gridView ?
                            R.map((currentIndex) => {
                                return <Card {...{ currentIndex, setCurrentIndex, deck, moveCard, gridView, imageSize: gridImageSize, addIcon, classes }} />
                            },
                                R.range(0, deck.length)) :
                            <Card {...{ currentIndex, setCurrentIndex, deck, moveCard, gridView, imageSize: singleImageSize, addIcon, classes }} />}
                    </div>}

                </div>
            </AccordionDetails>
        </Accordion>
    </div >
}
