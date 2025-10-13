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

let container = add([
    rect(100 * cells, 100 * cells),
    color(55,55,55),
    anchor("center"),
    pos(center()),
])

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
            // outline(4)
            "card"

        ])

    }
}

onClick("card", (card: GameObj) => {
    card.tween(1.0, -1.0, 0.5, (val: any) => {
        card.scaleTo(val, 1)
        card.wait(0.25, () => {
            card.setC
        })
    })
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