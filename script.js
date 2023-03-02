let currentScene = "";
kaboom({
    width: 640,
    height: 480,
    stretch: true,
    letterbox: true,
});
loadSound('boing', 'sounds/boing.mp3');
loadSound('bgMusic', 'sounds/backgroundMusic.mp3');
loadSound('woosh', 'sounds/woosh.flac');
loadSound('death', 'sounds/death.wav');
loadSound('scream', 'sounds/scream.mp3');
loadSound('disappear', 'sounds/disappear.wav');
loadSprite("stick", "sprites/stick.png");
loadSprite("bg", "sprites/bg.jpg");
loadSprite('gameOverBg', 'sprites/heaven.jpg')
loadSprite('logo', 'sprites/Logo.png');
loadSprite('homeStick', 'sprites/homeStick.png');
loadSprite('cloud', 'sprites/cloud.png');
loadSprite('cloudPlatform', 'sprites/cloudPlatform.png');
loadSprite('redCloudPlatform', 'sprites/redCloudPlatform.png');
loadSprite('greyCloudPlatform', 'sprites/greyCloudPlatform.png');
loadSprite('greenCloudPlatform', 'sprites/greenCloudPlatform.png');
loadSprite('halo', 'sprites/halo.png');
loadSprite('yellowEnemy', 'sprites/yellowEnemy.png')

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
        rect(10, height()),
        pos(-130, height() / 2),
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
        text('Press Enter To Start'),
        pos(width() / 2, height() - 90),
        origin('center'),
        scale(.5, .5),
        area(),
        z(2),
        'start'
    ])
    let instructionsButton = add([
        text('Press Shift For How To'),
        pos(width() / 2, height() - 40),
        origin('center'),
        scale(.4, .4),
        area(),
        z(2),
        'instructions'
    ])
    window.addEventListener("blur", () => {
        currTab = false;
    });
    window.addEventListener("focus", () => {
        currTab = true;
    });
    onKeyPress('enter',() => {
        go('game')
    });
    onKeyPress('shift',() => {
        go('gameInstructions')
    });
})
go('start')

scene('gameInstructions', () => {
    let bg = add([
        sprite("bg", {
            width: width() * 2,
            height: height()
        }),
        pos(width() / 2, height()/2),
        origin('center'),
        z(0)
    ])
    let title = add([
        text('How To Play'),
        scale(.5, .5),
        z(3)
    ])
    let rightMove = add([
        text('D key or right arrow key = move right'),
        scale(.3,.3),
        pos(0, 50),
        z(3)
    ])
    let leftMove = add([
        text('A key or left arrow key = move left'),
        scale(.3,.3),
        pos(0, 100),
        z(3)
    ])
    let whitePlat = add([
        sprite('cloudPlatform'),
        scale(.1, .1),
        pos(0, 150),
        z(3)
    ])
    let whiteText = add([
        text(' = Regular jump!'),
        scale(.3, .3),
        pos(153, 155),
        z(3)
    ])
    let greenPlat = add([
        sprite('greenCloudPlatform'),
        scale(.1, .1),
        pos(0, 200),
        z(3)
    ])
    let greentText = add([
        text(' = Super jump!'),
        scale(.3, .3),
        pos(153, 205),
        z(3)
    ])
    let greyPlat = add([
        sprite('greyCloudPlatform'),
        scale(.1, .1),
        pos(0, 250),
        z(3)
    ])
    let greyText = add([
        text(' = Cloud disappears after 1 jump!'),
        scale(.3, .3),
        pos(153, 255),
        z(3)
    ])
    let redPlat = add([
        sprite('redCloudPlatform'),
        scale(.1, .1),
        pos(0, 300),
        z(3)
    ])
    let redText = add([
        text(' = Holds enemies, WATCH OUT!'),
        scale(.3, .3),
        pos(153, 305),
        z(3)
    ])
    let enemyIn = add([
        sprite('yellowEnemy'),        
        scale(.2, .2),
        pos(0, 350),
        z(3)
    ])
    let enemyText = add([
        text(' = If you collide, GAME OVER!'),
        scale(.3, .3),
        pos(65, 365),
        z(3)
    ])
    let instructionsButton = add([
        text('Press R To Return To Main Menu'),
        pos(width() / 2, height() - 40),
        origin('center'),
        scale(.4, .4),
        z(3),
        'instructions'
    ])
    onKeyPress('r',() => {
        go('start')
    });
});

scene('gameOver', () => {
    currentScene = 'gameOver';
    let death = play('death', {
        volume: 0.6
    })
    let bg = add([
        sprite("gameOverBg", {
            width: width() * 2,
            height: height()
        }),
        pos(width() / 2, height()/2),
        origin('center'),
        z(0)
    ])
    let cloud = add([
        sprite('cloud'),
        origin('center'),
        pos(width()/2, height() + 80),
        scale(.2,.2)
    ])
    let character = add([
        sprite('stick'),
        pos(width()/2, height() - 300),
        origin('top'),
        scale(.8,.8)
    ])
    let halo = add([
        sprite('halo'),
        pos(width()/2 - 10, height()/4 + 70),
        origin('center'),
        scale(.6,.6)
    ])
    let cloud2 = add([
        sprite('cloud'),
        origin('center'),
        pos(50, height() + 80),
        scale(.2,.2)
    ])
    let cloud3 = add([
        sprite('cloud'),
        origin('center'),
        pos(width(), height() + 80),
        scale(.2,.2)
    ])
    if (score > highScore) {
        highScore = score;
    };
    let scoreBoard = add([
        text(`Score: ` + score),
        pos(20, height() -70),
        scale(.3, .3)
    ])
    let highScoreBoard = add([
        text(`Highscore: ` + highScore),
        pos(20, height() - 40),
        scale(.3, .3)
    ])
    let gameOver = add([
        text('Game Over'),
        pos(width() / 2, height() / 4 - 65),
        origin('center'),
        scale(.6, .6),
        area()
    ])
    let pressEnter = add([
        text('Press Enter To Try Again'),
        pos(width() / 2, height() / 4  -25),
        origin('center'),
         scale(.4, .4),
        area(),
        'start'
    ])
    onKeyPress('enter',() => {
        death.stop();
        go('game');
    });
});
scene('game', () => { 
    let bgMusic = play('bgMusic', {
        loop: true,
        volume: 0.4
    })
    currentScene = 'game';
    let deathCounter = 0;
    let firstJump = true;
    score = 0;
    let player = add([
        sprite("stick"),
        pos(width() / 2, 0),
        scale(.1, .1),
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
            clearInterval(platformGenerator);
            bgMusic.stop();
            go('gameOver');
        }
        else if (deathCounter === 6 && firstJump) {
            destroy(player);
            clearInterval(platformGenerator);
            bgMusic.stop();
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
    let direction = LEFT;

    const platform = () => {
        if (currentScene === "game") {
            let random = Math.floor(Math.random() * 15);
            if ((random === 5) && (score >= 500)) {
                add([
                    sprite('greenCloudPlatform'),
                    scale(.1,.1),
                    pos(Math.floor(Math.random() * width()), currHeight - 115),
                    origin('center'),
                    area(),
                    'boostPlatformTag'
                ]);
            }
             
            else if ((random === 3) && (score >= 500)) {
                add([
                    sprite('greyCloudPlatform'),
                    scale(.1,.1),
                    pos(Math.floor(Math.random() * width()), currHeight - 115),
                    origin('center'),
                    area(),
                    'oncePlatformTag'
                ]);
            }

            else if ((random === 7) && (score >= 500)) {
                let widthSize = Math.floor(Math.random() * 100) + 100;
                let widthPos = Math.floor(Math.random() * width())
                add([
                    sprite('redCloudPlatform'),
                    scale(.1,.1),
                    pos(widthPos, currHeight - 115),
                    origin('center'),
                    area(),
                    // solid(),
                    // move(DOWN, 100),
                    'enemyPlatformTag'
                ]);
                add([
                    sprite('yellowEnemy'),
                    pos(widthPos, currHeight - 130),
                    origin('center'),
                    scale(.1,.1),
                    area(),
                    solid(),
                    'enemy'
                ])
            }
            //   
            else {
                add([
                    sprite('cloudPlatform'),
                    scale(.1,.1),
                    pos(Math.floor(Math.random() * width()), currHeight - 115),
                    origin('center'),
                    area(),
                    'platformTag'
                ])
            }
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
            play('woosh', {
                volume: 0.25
            })
        }
    });

    player.onCollide("boostPlatformTag", () => {
        if (player.pos.y > lastPosY) {
            player.jump(1000);
            firstJump = false;
            deathCounter = 0;
            play('boing', {
                volume: .3
            })
        }
    });
    
    player.onCollide('enemy', (enemy) => {
        destroy(player);
        bgMusic.stop();
        go('gameOver');
    })

    player.onCollide("enemyPlatformTag", (platform) => {
        if (player.pos.y > lastPosY) {
            player.jump(500);
            firstJump = false;
            deathCounter = 0;
        }
    });

    player.onCollide("oncePlatformTag", (platform) => {
        if (player.pos.y > lastPosY) {
            player.jump(500);
            firstJump = false;
            deathCounter = 0;
            destroy(platform);
            play('disappear', {
                volume: 0.1
            });
        }
    });

    floor.onCollide("enemy", (enemy) => {
        destroy(enemy);
    })

    floor.onCollide("platformTag", (platform) => {
        destroy(platform);
        score += 100;
        scoreBoard.text = score;
    })

    floor.onCollide("boostPlatformTag", (platform) => {
        destroy(platform);
        score += 100;
        scoreBoard.text = score;
    })

    floor.onCollide("oncePlatformTag", (platform) => {
        destroy(platform);
        score += 100;
        scoreBoard.text = score;
    })

    floor.onCollide("enemyPlatformTag", (platform) => {
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
   
    let platformGenerator = setInterval(platform, 500);

    player.onUpdate(() => {
        if (player.pos.x >= width()) {
            player.pos.x = 0
        }
        else if (player.pos.x <= 0) {
            player.pos.x = width();
        }
    });

    gravity(900);

    onKeyDown("space", () => {
        if (firstJump) {
            player.jump(650);
            firstJump = false;
        }
    })


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