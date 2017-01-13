/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
var score;
var scoreText;
var lives;
var livesText;
var play;
var Collect;
game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/player.png', 96, 96);
        game.load.image('object', 'assets/object.png');
        game.load.image('object2', 'assets/object2.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('object3', 'assets/object3.png');
        game.load.image('object4', 'assets/object4.png');
        game.load.audio('RockSound', 'assets/RockBreak.wav');
        game.load.audio('Collect', 'assets/Collect.wav');

    },
    create: function() {
        //Add audio
        this.RockSound = game.add.audio('RockSound');
        this.RockSound.volume = 1;
        this.Collect = game.add.audio('Collect');
        this.Collect.volume = 1;

        game.stage.backgroundColor = '#383838';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = game.add.sprite(200, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.enablebody = true;
        this.player.body.setSize(40, 80, 30, 0)
        this.player.body.immovable = true;

        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


        this.objects = game.add.group();
        this.objects.enableBody = true;

        this.diamonds = game.add.group();
        this.diamonds.enableBody = true;

        this.irons = game.add.group();
        this.irons.enableBody = true;

        this.golds = game.add.group();
        this.golds.enableBody = true;
        var _this = this;

        this.player.animations.add('left', [0, 1, 2], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.animations.add('idle', [0, ], 0, true);

        setInterval(function() {
                var object2 = _this.diamonds.create(Math.random() * 800, -64, 'object2');
                object2.body.gravity.y = 250;
                object2.body.setSize(70, 70, 10, 0);
            }, 7500),

            scoreText = game.add.text(16, 16, 'score: 0', {
                fontSize: "96px",
                fill: '#000'
            }),
            score = 0;

        livesText = game.add.text(16, 50, 'lives: 5', {
                fontSize: "96px",
                fill: '#000'

            }),
            lives = 5;

        setInterval(function() {
                var object = _this.objects.create(Math.random() * 800, -64, 'object');

                object.body.gravity.y = 350;
            }, 1000),

            setInterval(function() {
                var object3 = _this.irons.create(Math.random() * 800, -64, 'object3');
                object3.body.gravity.y = 250;

            }, 1400),
 
            setInterval(function() {
                var object4 = _this.golds.create(Math.random() * 800, -64, 'object4');
                object4.body.gravity.y = 250;

            }, 3600);
    },

    update: function() {
        
        if (lives < 1) {
            this.player.kill();
        }


        this.score += 1;
        scoreText.text = 'Score: ' + score;
        livesText.text = 'Lives: ' + lives;
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
            this.player.animations.play('left');

        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
            this.player.animations.play('right');

        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.play('idle');

        }

        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
        game.physics.arcade.overlap(this.player, this.irons, this.hitirons, null, this);
        game.physics.arcade.overlap(this.player, this.diamonds, this.hitdiamonds, null, this);
        game.physics.arcade.overlap(this.player, this.golds, this.hitgolds, null, this);
    },
    hitObject: function(player, object) {
        object.kill();
        lives -= 1;
        this.RockSound.play();
    },
    hitdiamonds: function(player, diamonds) {
        diamonds.kill();
        score += 5;
        this.Collect.play();
    },

    hitirons: function(player, irons) {
        irons.kill();
        score += 1;
        this.Collect.play();

    },
    hitgolds: function(player, golds) {
        golds.kill();
        score += 3;
        this.Collect.play();

    }
};
this.game.state.add('main', game_state.main);