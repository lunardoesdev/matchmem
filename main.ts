import kaplay, { type GameObj } from "kaplay"
import "kaplay/global"
import assets from "./assets"

kaplay()

const cells = Math.min(width(), height()) / 100
const offset = 5 * cells

const cardFullWidth = 25 * cells

const cardWidth = 25 * cells - 5/4 * offset
const cardHeight = 25 * cells - 5/4 * offset

loadSprite("cover", assets.cover)
loadSprite("circle", assets.circle)
loadSprite("square", assets.square)
loadSprite("triangle", assets.triangle)

let container = add([
    rect(100 * cells, 100 * cells),
    color(55,55,55),
    anchor("center"),
    pos(center()),
    rotate(0),
    timer(),

    {
        win: false
    }
])

let cards = [
    "circle",
    "square",
    "triangle",
    "triangle"
]
cards = [
    ...cards, 
    ...cards,
    ...cards, 
    ...cards
]

for (let i = 0; i < 160; i++) {
    let ri = Math.floor(Math.random() * 16)
    let ri2 = Math.floor(Math.random() * 16)
    
    let tmp = cards[ri] 
    cards[ri] = cards[ri2]!
    cards[ri2] = tmp!
}

for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
        const startX = cardWidth * x
        const startY = cardHeight * y

        const card = container.add([
            // rect(cardWidth, cardHeight),
            pos(startX + (x + 1) * offset - container.width / 2 + cardWidth / 2, 
                startY + (y + 1) * offset - container.height / 2 + cardHeight / 2),
            timer(),
            scale(1, 1),
            area(),
            anchor("center"),
            sprite("cover", {
                width: cardWidth,
                height: cardHeight,
            }),
            color(255, 255, 120),
            rotate(0),

            // outline(4)
            "card",
            {
                x: x,
                y: y,
                card: cards.pop(),
                open: false,
                clickable: true
            }

        ])

    }
}

async function openCard(card: GameObj) {
    card.open = true
    selCards += 1
    card.clickable = false
    const time = 0.3
    const timepart = time / 2
    await card.tween(1.0, 0, timepart, (val: any) => {
        card.scaleTo(val, 1)
    })
    card.sprite = card.card
    card.color.r = 255
    card.color.g = 0
    card.color.b = 0
    
    await card.tween(0.0, 1.0, timepart, (val: any) => {
        card.scaleTo(val, 1)
    })

    card.clickable = true
}

var selCards = 0

async function closeCard(card: GameObj) {
    if (!card.open) return
    card.open = false
    card.clickable = true
    const time = 0.3
    const timepart = time / 2
    await card.tween(1.0, 0, timepart, (val: any) => {
        card.scaleTo(val, 1)
    })
    card.sprite = "cover"
    card.color.r = 255
    card.color.g = 255
    card.color.b = 255
    card.tween(0.0, 1.0, timepart, (val: any) => {
        card.scaleTo(val, 1)
    })
    card.clickable = true
    selCards -= 1
}

var lastCard: GameObj | undefined = undefined

let cardsLeft = 16

async function matchRotate(card1: GameObj, card2: GameObj) {
    await tween(0, 135, 0.5, (val) => {
        card1.rotateTo(val)
        card2.rotateTo(val)        
    })
}

onClick("card", async (card: GameObj) => {
    if (card.clickable && selCards < 2) {
        if (card.open) {
            closeCard(card)
        } else {
            await openCard(card)
            if (lastCard != null)
            if (((lastCard.x != card.x) || (lastCard.y != card.y)) && lastCard.card == card.card) {
                console.log(lastCard.sprite)
                lastCard.clickable = false
                matchRotate(card, lastCard)
                card.clickable = false
                lastCard = undefined
                cardsLeft -= 2
                selCards -= 2
            } else {
                await wait(0.2)
                if (lastCard != undefined)
                    closeCard(lastCard)
                await closeCard(card)
                lastCard = undefined
            }
        }
    }

    if (card.open && card.clickable)
        lastCard = card

    if (!container.win && cardsLeft == 0) {
        /// WIN
        container.onUpdate(() => {
            container.rotateBy(2)
        })
    }
    console.log(selCards)
})

// let rot = rotate(30)

// const obj = add([
//     rect(128, 128),
//     pos(center()),
//     anchor("center"),
//     rot,
//     "obj"
// ])

// onUpdate("obj", (obj) => {

//     rot.rotateBy(2)
// })