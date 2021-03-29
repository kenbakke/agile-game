import * as R from "ramda"

import card01 from "../public/Card_01.png"
import card02 from "../public/Card_02.png"
import card03 from "../public/Card_03.png"
import card04 from "../public/Card_04.png"
import card05 from "../public/Card_05.png"
import card06 from "../public/Card_06.png"
import card07 from "../public/Card_07.png"
import card08 from "../public/Card_08.png"
import card09 from "../public/Card_09.png"
import card10 from "../public/Card_10.png"
import card11 from "../public/Card_11.png"
import card12 from "../public/Card_12.png"
import card13 from "../public/Card_13.png"
import card14 from "../public/Card_14.png"
import card15 from "../public/Card_15.png"
import card16 from "../public/Card_16.png"
import card17 from "../public/Card_17.png"
import card18 from "../public/Card_18.png"
import card19 from "../public/Card_19.png"
import card20 from "../public/Card_20.png"
import card21 from "../public/Card_21.png"
import card22 from "../public/Card_22.png"
import card23 from "../public/Card_23.png"
import card24 from "../public/Card_24.png"
import card25 from "../public/Card_25.png"
import card26 from "../public/Card_26.png"

export const cards = [
    { id: 0, round: 1, sprint: 0, happiness: [0, 0, 2, 3, 0], story: 5, value: 3, card: card01 },
    { id: 1, round: 1, sprint: 0, happiness: [0, 1, 1, 1, 0], story: 5, value: 4, card: card02 },
    { id: 2, round: 2, sprint: 0, happiness: [1, 1, -1, -1, -2], story: 2, value: 5, card: card03 },
    { id: 3, round: 1, sprint: 0, happiness: [1, 1, 0, 0, 2], story: 3, value: 4, card: card04 },
    { id: 4, round: 1, sprint: 0, happiness: [0, 1, 0, 0, 1], story: 2, value: 2, card: card05 },
    { id: 5, round: 2, sprint: 0, happiness: [0, -1, 2, 1, -1], story: 1, value: 2, card: card06 },
    { id: 6, round: 2, sprint: 0, happiness: [-1, 2, 4, 0, 0], story: 4, value: 6, card: card07 },
    { id: 7, round: 1, sprint: 0, happiness: [-1, 1, 3, 1, 0], story: 4, value: 3, card: card08 },
    { id: 8, round: 1, sprint: 0, happiness: [1, 3, 0, 1, 1], story: 2, value: 2, card: card09 },
    { id: 9, round: 2, sprint: 0, happiness: [0, 0, 0, 2, 2], story: 3, value: 1, card: card10 },
    { id: 10, round: 1, sprint: 0, happiness: [2, 2, 0, 0, 0], story: 2, value: 4, card: card11 },
    { id: 11, round: 3, sprint: 0, happiness: [-2, 2, 0, 2, 2], story: 2, value: 4, card: card12 },
    { id: 12, round: 1, sprint: 0, happiness: [-1, 1, 2, 0, 4], story: 2, value: 3, card: card13 },
    { id: 13, round: 1, sprint: 0, happiness: [0, 0, 0, 0, -1], story: 3, value: 0, card: card14 },
    { id: 14, round: 1, sprint: 0, happiness: [-2, 3, 2, 0, 0], story: 1, value: 3, card: card15 },
    { id: 15, round: 1, sprint: 0, happiness: [-2, 0, 0, 0, 0], story: 2, value: 0, card: card16 },
    { id: 16, round: 3, sprint: 0, happiness: [-1, 1, 0, 2, 1], story: 1, value: 2, card: card17 },
    { id: 17, round: 1, sprint: 0, happiness: [0, 0, 0, 1, 1], story: 2, value: 0, card: card18 },
    { id: 18, round: 1, sprint: 0, happiness: [3, 3, -1, -3, 0], story: 2, value: 4, card: card19 },
    { id: 19, round: 2, sprint: 0, happiness: [0, 0, -1, 4, 1], story: 2, value: 1, card: card20 },
    { id: 20, round: 3, sprint: 0, happiness: [0, -1, 0, 1, 3], story: 2, value: 1, card: card21 },
    { id: 21, round: 2, sprint: 0, happiness: [0, 0, 0, 3, 1], story: 1, value: 0, card: card22 },
    { id: 22, round: 1, sprint: 0, happiness: [1, 3, 0, -1, -3], story: 2, value: 3, card: card23 },
    { id: 23, round: 2, sprint: 0, happiness: [1, 0, 0, 0, 0], story: 2, value: 0, card: card24 },
    { id: 24, round: 1, sprint: 0, happiness: [0, 0, 0, 0, -2], story: 4, value: 0, card: card25 },
    { id: 25, round: 2, sprint: 0, happiness: [1, 2, -2, 2, 2], story: 2, value: 5, card: card26 }
]

const getSprint = (deck) => (cardNo) => R.compose(R.prop("sprint"), R.prop(0), R.filter(R.propEq("id", cardNo - 1)))(deck)

const card03Extra = (deck) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            R.propEq("id", 18),
            R.assoc("value", 0),
            R.identity))(deck)
    },
    sprint => deck)(getSprint(deck)(3))

const card13Extra = (deck) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            card => R.gt(R.prop("sprint", card), sprint),
            card => R.assoc("story", card.story + 1, card),
            R.identity))(deck)
    },
    sprint => deck)(getSprint(deck)(13))

const card14Extra = (deck) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            card => R.and(R.gte(R.prop("sprint", card), sprint), R.includes(R.prop("id", card), [0, 5, 9, 17, 19, 20, 21])),
            card => R.assoc("story", card.story - 1, card),
            R.identity))(deck)
    },
    sprint => deck)(getSprint(deck)(14))

const card16Extra = (deck) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            card => R.and(R.gte(R.prop("sprint", card), sprint), R.includes(R.prop("id", card), [7])),
            card => R.assoc("story", 3, card),
            R.identity))(deck)
    },
    sprint => deck)(getSprint(deck)(16))

const card16ExtraScore = (deck) => (scores) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            score => R.gt(R.prop("sprint", score), sprint),
            score => R.assoc("velocity", score.velocity + 1, score),
            R.identity))(scores)
    },
    sprint => scores)(getSprint(deck)(16))

const card25ExtraScore = (deck) => (scores) => R.ifElse(
    sprint => R.gt(sprint, 0),
    sprint => {
        return R.map(R.ifElse(
            score => R.equals(R.prop("sprint", score), sprint + 1),
            score => R.assoc("velocity", score.velocity + 3, score),
            R.identity))(scores)
    },
    sprint => scores)(getSprint(deck)(25))

export const deckModifiers = [card03Extra, card13Extra, card14Extra, card16Extra]
export const scoreModifiers = [card25ExtraScore, card16ExtraScore]