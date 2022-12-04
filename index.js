var st = document.getElementById("start")
var speed = document.getElementById("speed")
var sqr = document.getElementById("sqr")
var startgamediv = document.getElementById("startgamediv")
var resetdiv = document.getElementById("resetdiv")
var btnreset = document.getElementById("btnreset")
speed.value = 1
st.addEventListener("click", () => {

    if (Number(speed.value) > 5 || Number(speed.value) < 1) {
        alert("from 1 to 5")
        window.location.reload()
    }
    game(Number(speed.value))
})

function game(speedgame) {

    sqr.style.display = "block";
    startgamediv.style.display = "none"

    function getPosStyle(el, name) {
        let s = getComputedStyle(el)
        var numofs;
        if (name == "top") {
            numofs = Number(s.top.replace("px", ""))
        } else if (name == "left") {
            numofs = Number(s.left.replace("px", ""))
        } else if (name == "right") {
            numofs = Number(s.right.replace("px", ""))
        } else if (name == "bottom") {
            numofs = Number(s.bottom.replace("px", ""))
        }
        return numofs
    }

    let movein;
    let ismovedleft = false
    let ismovetop = false
    let width = window.innerWidth - 95
    let height = window.innerHeight - 95
    let clickmovetop = false
    let clickmoveleft = false
    let clickmoveright = true
    let clickmovebottom = true

    function stop() {

        if (ismovedleft == true) {
            if (getPosStyle(sqr, "left") >= width) {
                clearInterval(movein)
                clickmoveright = false
                reset()
            } else if (getPosStyle(sqr, "left") < 0 - speedgame) {
                clearInterval(movein)
                clickmoveleft = false
                reset()
            }
            ismovedleft = false

        }
        if (ismovetop == true) {
            if (getPosStyle(sqr, "top") >= height) {
                clearInterval(movein)
                clickmovebottom = false
                reset()
            } else if (getPosStyle(sqr, "top") < 0 + speedgame) {
                clearInterval(movein)
                clickmovetop = false
                reset()
            }
            ismovetop = false

        }
    }

    function move(way) {

        movein = setInterval(function() {
            if (way == "top") {
                ismovetop = true
                var news = getPosStyle(sqr, "top") - speedgame
                sqr.style.top = news + "px";
                clickmovebottom = true
            } else if (way == "left") {
                ismovedleft = true
                var news = getPosStyle(sqr, "left") - speedgame
                sqr.style.left = news + "px";
                clickmoveright = true
            } else if (way == "right") {
                ismovedleft = true
                var news = getPosStyle(sqr, "left") + speedgame
                sqr.style.left = news + "px";
                clickmoveleft = true
            } else if (way == "bottom") {
                ismovetop = true
                var news = getPosStyle(sqr, "top") + speedgame
                sqr.style.top = news + "px";
                clickmovetop = true
            }
            stop()
        }, 1)
    }
    window.addEventListener("keyup", (event) => {

        if (event.which == 39 && clickmoveright == true) {
            clearInterval(movein)
            move("right")
        } else if (event.which == 37 && clickmoveleft == true) {
            clearInterval(movein)
            move("left")
        } else if (event.which == 38 && clickmovetop == true) {
            clearInterval(movein)
            move("top")
        } else if (event.which == 40 && clickmovebottom == true) {
            clearInterval(movein)
            move("bottom")
        }


    })
}

function reset() {
    sqr.style.display = "none"
    resetdiv.style.display = "flex"
    btnreset.addEventListener("click", () => {
        window.location.reload()
    })
}