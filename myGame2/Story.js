/* global game phaser game_state */
game_state.story = function() {};
var Phaser;
game_state.story.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/player.png', 96, 96);
        game.load.image('object', 'assets/object.png');
        game.load.image('object4', 'assets/object4.png');

    },
    create: function() {
        this.player = game.add.sprite(150, 400, 'player');
        this.object = game.add.sprite(180, 350, 'object');
        this.object4 = game.add.sprite(120, 450, 'object4');
        
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        var _this = this;
        // setInterval(function() {
            this.scoreText = game.add.text(16, 16, '   There was once a miner named Mr. Miner Guy. \n Mr. Miner Guy was broke. He needed more money for a \n better home before rain season came and washed his \n current house away, because it was made of mud. So he \n decided to go to a cave and look for valuable things. \n But while he was searching there was a cave in, and rocks \n fell on his head! Now he must dodge them while collecting \n as many valuable things as possible!!!', {
                fontSize: "120px",
                fill: '#10ce79'
            });

        // });
        // setInterval(function() {
            _this.scoreText = game.add.text(360, 509, '<press enter>', {
                fontSize: "60px",
                fill: '#b2b2b2'
                
                

            });


        // });
    },

    update: function() {

    if (this.left.isDown) {
        game.state.start('main');
    }
  
    },

};
game.state.add('story', game_state.story);
game.state.start('story');
