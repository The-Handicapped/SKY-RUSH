let currentScene = "";
kaboom({
    // set the canvas size
    width: 640,
    height: 480,
    stretch: true,
    letterbox: true,
});
loadSound('boing', 'boing.mp3');
loadSound('bgMusic', 'backgroundMusic.mp3')
loadSprite("stick", "sprites/stick.png");
loadSprite("bg", "sprites/bg.jpg");
loadSprite('logo', 'sprites/Logo.png');
loadSprite('homeStick', 'sprites/homeStick.png');
loadSprite('cloud', 'sprites/cloud.png')
let highScore = 0;
let score = 0
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
    let cloudRemover = add([
        rect(10,height()),
        pos(-130,height()/2),
        origin('center'),
        area(),
        solid(),
        z(3)
    ])
    const clouds = () => {
        if (currentScene === "start" && currTab) {
            add([
                sprite('cloud'),
                pos(width() + 100, Math.floor(Math.random() * height())),
                scale(.03, .03),
                origin('center'),
                area(),
                move(LEFT, 50),
                'cloud',
                z(1)
            ])
        }
    }
    clouds()
    let cloudGenerator = setInterval(clouds, 5000);
    cloudRemover.onCollide('cloud', (cloud) => {
        destroy(cloud)
    })
    let logo = add([
        sprite('logo'),
        pos(width() / 2, height() / 4),
        origin('center'),
        scale(.3, .3),
        z(2)
    ])
    let character = add([
        sprite('homeStick'),
        pos(width() / 2, height() / 2 + 40),
        scale(.2, .2),
        origin('center')
    ])
    let startButton = add([
        text('Click here to start'),
        pos(width() / 2, height() - 90),
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
    if(score > highScore){
        highScore = score;
    };
    let scoreBoard = add([
        text(`Score: `+score),
        pos(20, 20),
        scale(.5, .5)
    ])
    let highScoreBoard = add([
        text(`Highscore: `+highScore),
        pos(20, 60),
        scale(.5, .5)
    ])
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
});

scene('game', () => {
    // play('bgMusic', {
    //     loop: true,
    //     volume: 0.3
    // })
    currentScene = 'game';
    let deathCounter = 0;
    let firstJump = true;
    score = 0;
    let player = add([
        sprite("stick"),
        pos(width() / 2, 0),
        scale(.03, .03),
        area(),
        body(),
        solid(),
        z(1),
        'char'
    ])
    let bg = add([
        sprite("bg", {
            width: width() * 2,
            height: height()
        }),
        pos(width() / 2, player.pos.y),
        origin('center'),
        z(0)
    ])
    player.onUpdate(() => {
        camPos(center().x, player.pos.y)
    })
    bg.onUpdate(() => {
        bg.pos.y = player.pos.y;
    });
    setInterval(() => {
        deathCounter++;
        if (deathCounter === 3 && !firstJump) {
            destroy(player);
            every('platformTag', (platforms) => {
                destroy(platforms);
            });
            clearInterval(platformGenerator);
            go('gameOver');
        }
        else if(deathCounter === 6 && firstJump){
            destroy(player);
            every('platformTag', (platforms) => {
                destroy(platforms);
            });
            clearInterval(platformGenerator);
            go('gameOver');
        }
    }, 1000)
    let scoreBoard = add([
        text(score),
        pos(20, 20),
        scale(.5, .5)
    ])
    scoreBoard.onUpdate(() => {
        scoreBoard.pos.y = player.pos.y - 230
    })
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
    let lastPosY = player.pos.y;
    let currHeight = height();

    const platform = () => {
        if (currentScene === "game") {
            add([
                // sprite('cloud'),
                // scale(.03,.03),
                rect(Math.floor(Math.random() * 100) + 100, 10),
                pos(Math.floor(Math.random() * width()), currHeight - 115),
                origin('center'),
                area(),
                // solid(),
                // move(DOWN, 100),
                'platformTag'
            ]);
            currHeight -= 115;
        }
    }
    onUpdate(() => {
        lastPosY = player.pos.y;
    });
    player.onCollide("platformTag", () => {
        if (player.pos.y > lastPosY) {
            player.jump(500);
            firstJump = false;
            deathCounter = 0;
            // play('boing', {
            //     volume: 0.1
            // })
        }
    });
    floor.onCollide("platformTag", (platform) => {
        destroy(platform);
        score += 100;
        scoreBoard.text = score;
    })
    floor.onUpdate(() => {
        floor.pos.y = player.pos.y + 500
    })
    floor.onCollide('startFloor', (start) => {
        destroy(start);
    })
    // floor.onCollide('char', (character) => {
    //     destroy(character);
    //     every('platformTag', (platforms) => {
    //         destroy(platforms);
    //     });
    //     clearInterval(platformGenerator);
    //     go('gameOver');
    // })
    let platformGenerator = setInterval(platform, 500);
    player.onUpdate(() => {
        if (player.pos.x >= width()) {
            player.pos.x = 0
        }
        else if (player.pos.x <= 0) {
            player.pos.x = width();
        }
    })
    // player.onUpdate(() => {
    //     if (player.isGrounded()) {
    //         player.jump();
    //         play('boing')
    //     }
    // })
    gravity(900);
    // let SPEED = 900;

    onKeyDown("space", () => {
        if (firstJump) {
            player.jump(650);
            firstJump = false;
        }
    })

    // onKeyDown("space", () => {
    //     player.jump(650);
    // })
    onKeyDown("left", () => {
        player.move(-400, 0);
    })
    onKeyDown("a", () => {
        player.move(-400, 0);
    })
    onKeyDown("right", () => {
        player.move(400, 0)
    })
    onKeyDown("d", () => {
        player.move(400, 0)
    })
})