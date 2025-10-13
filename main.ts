import kaplay from "kaplay"
import "kaplay/global"

kaplay()

let rot = rotate(30)

const obj = add([
    rect(128, 128),
    pos(center()),
    anchor("center"),
    rot,
    "obj"
])

onUpdate("obj", (obj) => {

    rot.rotateBy(2)
})