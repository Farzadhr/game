function game() {
    var sqr = document.getElementById("sqr")

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
    let width = window.innerWidth - 100
    let height = window.innerHeight - 100
    let clickmovetop = false
    let clickmoveleft = false
    let clickmoveright = true
    let clickmovebottom = true

    function stop() {

        if (ismovedleft == true) {
            if (getPosStyle(sqr, "left") == width) {
                clearInterval(movein)
                clickmoveright = false
                alert("you lose")
            } else if (getPosStyle(sqr, "left") == 0) {
                clearInterval(movein)
                clickmoveleft = false
                alert("you lose")
            }
            ismovedleft = false

        }
        if (ismovetop == true) {
            if (getPosStyle(sqr, "top") == height) {
                clearInterval(movein)
                clickmovebottom = false
                alert("you lose")
            } else if (getPosStyle(sqr, "top") == 0) {
                clearInterval(movein)
                clickmovetop = false
                alert("you lose")
            }
            ismovetop = false

        }
    }

    function move(way) {

        movein = setInterval(function() {
            if (way == "top") {
                ismovetop = true
                var news = getPosStyle(sqr, "top") - 1
                sqr.style.top = news + "px";
                clickmovebottom = true
            } else if (way == "left") {
                ismovedleft = true
                var news = getPosStyle(sqr, "left") - 1
                sqr.style.left = news + "px";
                clickmoveright = true
            } else if (way == "right") {
                ismovedleft = true
                var news = getPosStyle(sqr, "left") + 1
                sqr.style.left = news + "px";
                clickmoveleft = true
            } else if (way == "bottom") {
                ismovetop = true
                var news = getPosStyle(sqr, "top") + 1
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
game()