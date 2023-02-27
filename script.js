let currentScene = "";
kaboom({
    // set the canvas size
    width: 640,
    height: 480,
    stretch: true,
    letterbox: true,
});

loadSound('boing', 'boing.mp3');
loadSprite("stick", "stick.png");
loadSprite("bg", "bg.jpg");
loadSprite('logo', 'Logo.png')

scene('start', () => {
    currentScene = 'start';
    let background = add([
        sprite("bg", {
            width: width(),
            height: height()
        }),
        z(0)
    ])

    let currTab = true;

    const clouds = () => {
        if (currentScene === "start" && currTab) {
            add([
                rect(100, 10),
                pos(width(), Math.floor(Math.random() * height())),
                origin('center'),
                area(),
                move(LEFT, 50),
                z(1)
            ])
        }
    }

    clouds()
    let cloudGenerator = setInterval(clouds, 5000);

    let logo = add([
        sprite('logo'),
        pos(width() / 2, height() / 4),
        origin('center'),
        scale(.3, .3),
        z(2)
    ])
    let startButton = add([
        text('Click here to start'),
        pos(width() / 2, height() / 2),
        origin('center'),
        scale(.5, .5),
        area(),
        z(2),
        'start'
    ])

    window.addEventListener("blur", () => {
        currTab = false;
    });
    window.addEventListener("focus", () => {
        currTab = true;
    });

    startButton.onClick(() => {
        go('game')
    });

})

go('start')

scene('gameOver', () => {
    currentScene = 'gameOver';
    let retryButton = add([
        text('Try Again?'),
        pos(width() / 2, height() / 2),
        origin('center'),
        scale(.5, .5),
        area(),
        'start'
    ])

    retryButton.onClick(() => {
        go('game')
    });

})

scene('game', () => {
    currentScene = 'game';
    let score = 0;
    let background = add([
        sprite("bg", {
            width: width(),
            height: height()
        })
    ])

    let player = add([
        sprite("stick"),
        pos(width() / 2, 0),
        scale(.03, .03),
        area(),
        body(),
        solid(),
        'char'
    ])

    let scoreBoard = add([
        text(score),
        pos(20, 20),
        scale(.5, .5)
    ])

    let floor = add([
        rect(width(), 10),
        pos(width() / 2, height()),
        origin('center'),
        area(),
        solid()
    ])

    let startFloor = add([
        rect(width(), 10),
        color('black'),
        pos(width() / 2, height() / 2),
        origin('center'),
        area(),
        solid(),
        move(DOWN, 50),
        'startFloor'
    ])

    const platform = () => {
        if (currentScene === "game") {
            add([
                rect(Math.floor(Math.random() * 200) + 100, 10),
                pos(Math.floor(Math.random() * width()), - 10),
                origin('center'),
                area(),
                color('black'),
                solid(),
                move(DOWN, 100),
                'platformTag'
            ])
        }
    }

    floor.onCollide("platformTag", (platform) => {
        destroy(platform);
        score += 100;
        scoreBoard.text = score;
    })

    floor.onCollide('startFloor', (start) => {
        destroy(start);
    })

    floor.onCollide('char', (character) => {
        destroy(character);
        every('platformTag', (platforms) => {
            destroy(platforms);
        });
        clearInterval(platformGenerator);
        go('gameOver');
    })

    let platformGenerator = setInterval(platform, 1000);

    player.onUpdate(() => {
        if (player.pos.x >= width()) {
            player.pos.x = 0
        }
        else if (player.pos.x <= 0) {
            player.pos.x = width();
        }
    })

    player.onUpdate(() => {
        if (player.isGrounded()) {
            player.jump();
            play('boing')
        }
    })

    gravity(900);

    let SPEED = 900;

    onKeyDown("left", () => {
        player.move(-SPEED, 0);
    })

    onKeyDown("a", () => {
        player.move(-SPEED, 0);
    })

    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

    onKeyDown("d", () => {
        player.move(SPEED, 0)
    })
})