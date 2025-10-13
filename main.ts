import kaplay from "kaplay"
import "kaplay/global"

kaplay()

const cells = Math.min(width(), height()) / 100
const offset = 5 * cells

const cardFullWidth = 25 * cells

const cardWidth = 25 * cells - 5/4 * offset
const cardHeight = 25 * cells - 5/4 * offset

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

        container.add([
            rect(cardWidth, cardHeight),
            pos(startX + (x + 1) * offset - container.width / 2, 
                startY + (y + 1) * offset - container.height / 2),
            // outline(4)
        ])
    }
}

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