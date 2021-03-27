import React, { useState, useMemo } from "react";
import * as R from "ramda"

import AppBar from '@material-ui/core/AppBar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { AgilePanel } from "./AgilePanel";
import { AgileScore } from "./AgileScore";

import { cards } from "./agileCards"

const useStyles = makeStyles((theme) => ({
    select: {
        marginLeft: theme.spacing(8),
        color: "white",
        '&:before': {
            borderColor: "white",
        },
        '&:after': {
            borderColor: "white",
        }
    },
    selectIcon: {
        fill: "white"
    },
    icon: {
        marginRight: theme.spacing(2),
    },
}));

const getScore = (deck, sprint, sprintPoints) => {
    const scores = R.map(
        sprint => R.compose(
            R.assoc("velocity", sprintPoints[sprint - 1]),
            R.assoc("sprint", sprint),
            R.reduce((acc, card) => {
                return {
                    story: acc.story + card.story,
                    value: acc.value + card.value,
                    happiness: R.map(idx => acc.happiness[idx] + card.happiness[idx], R.range(0, acc.happiness.length))
                }
            }, { story: 0, value: 0, happiness: [0, 0, 0, 0, 0] }),
            R.filter(R.propEq("sprint", sprint))
        )(deck)
    )(R.range(1, sprint + 1))

    const total = R.compose(
        total => R.append(total, scores),
        total => {
            const sum = total.value + R.reduce(R.add, 0, total.happiness)
            return R.assoc("sprint", `TOTAL: (${sum})`, total)
        },
        R.reduce((acc, card) => {
            return {
                story: acc.story + card.story,
                value: acc.value + card.value * 100,
                happiness: R.map(idx => acc.happiness[idx] + card.happiness[idx] * 25, R.range(0, acc.happiness.length))
            }
        }, { story: 0, value: 0, happiness: [0, 0, 0, 0, 0] })
    )(scores)
    return total
}

const SprintPoints = ({classes, points, setPoints}) => <Select className={classes.select}
    native
    inputProps={{
        classes: {
            icon: classes.selectIcon,
        },
    }}
    value={points}
    onChange={e => { setPoints(parseInt(e.target.value)) }}
>
    <option value={13}>13 points</option>
    <option value={15}>15 points</option>
    <option value={17}>17 points</option>
</Select>

export const AgileGame = () => {
    const classes = useStyles()

    const [sprint, setSprint] = useState(1)
    const [sprintPoints, setSprintPoints] = useState([15, 15, 15])

    const [deck, setDeck] = useState(cards)

    const getDeck = index => R.compose(
        R.defaultTo([]),
        R.filter(card => R.lte(card.round, sprint)),
        R.filter(R.propEq("sprint", index)))(deck)

    const moveCard = (sprint) => (id) => {
        const newCard = R.compose(R.assoc("sprint", sprint), R.prop(0), R.filter(R.propEq("id", id)))(cards)
        const newDeck = R.compose(
            R.sortBy(R.prop("id")),
            R.append(newCard),
            R.filter(card => R.not(R.propEq("id", id, card)))
        )(deck)
        setDeck(newDeck)
    }

    const score = useMemo(() => getScore(deck, sprint, sprintPoints), [deck, sprint, sprintPoints])
    
    const setPoints = (sprint) => (points) => setSprintPoints(
        R.map(R.ifElse(index => sprint - 1 === index, index => points, index => sprintPoints[index]), R.range(0, sprintPoints.length)))

    return <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <AssignmentIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    Agile game
                </Typography>
                <Select className={classes.select}
                    native
                    inputProps={{
                        classes: {
                            icon: classes.selectIcon,
                        },
                    }}
                    value={sprint}
                    onChange={e => { setSprint(parseInt(e.target.value)) }}
                >
                    <option value={1}>Sprint 1</option>
                    <option value={2}>Sprint 2</option>
                    <option value={3}>Sprint 3</option>
                </Select>
                <SprintPoints {...{classes, points: sprintPoints[sprint - 1], setPoints: setPoints(sprint)}} />
            </Toolbar>
        </AppBar>
        <AgileScore {...{ score }} />
        <AgilePanel {...{ moveCard: moveCard(sprint), addIcon: true, deck: getDeck(0), name: "Backlog" }} />
        <AgilePanel {...{ moveCard: moveCard(0), addIcon: false, deck: getDeck(1), name: "Sprint 1" }} />
        {sprint > 1 && <AgilePanel {...{ moveCard: moveCard(0), addIcon: false, deck: getDeck(2), name: "Sprint 2" }} />}
        {sprint > 2 && <AgilePanel {...{ moveCard: moveCard(0), addIcon: false, deck: getDeck(3), name: "Sprint 3" }} />}
    </React.Fragment>
}