var dualnback = function(){
	var canvas;
	var controls;
	
	var score;

	var colors;
	var box = function() { return {color: "", x: 0, y: 0} };
	var history;


	var posLock;
	var colorLock;



	return{
		init: function(){

			this.score = 0;

			this.colors = ["#02D0FF", "#FF0202", "#FFE902", "#185903", "#21025E"]
			this.history = new Array;

			this.canvas = document.createElement('canvas');
			this.canvas.width = 500;
			this.canvas.height = 375;
			document.body.appendChild(this.canvas);
			
			this.createControls();
			this.draw();

			var that = this;
			var FPS = 1;
            setInterval(function(){
            	that.draw();
                that.update();
            }, 1000/FPS)

		},

		createControls: function(){
			var that = this;
			this.controls = document.createElement('div');
			this.controls.id = "controls";

			var posButton = document.createElement('div');
			posButton.id = "posButton";
			posButton.innerHTML = "Position";
			posButton.onclick = function(){ that.checkGuess('position') };

			var colorButton = document.createElement('div');
			colorButton.id = "colorButton";
			colorButton.innerHTML = "Color";
			colorButton.onclick = function(){ that.checkGuess('color') };

			document.body.appendChild(this.controls);
			this.controls.appendChild(posButton);
			this.controls.appendChild(colorButton);

		},

		draw: function(){
			var ctx = this.canvas.getContext("2d");
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			ctx.strokeStyle="##C0C0C0";
			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					ctx.strokeRect(25 + i * 100, 25 + j * 100, 100, 100);
				}
			}
		},

		update: function(){

			var current = this.history[this.history.length - 1];
			var prev = this.history[this.history.length - 3];
			if(current && prev) {

				if(!this.posLock){
					if(current.x == prev.x && current.y == prev.y)
						this.score--;
				}

				if(!this.colorLock){
					if(current.color == prev.color)
						this.score--;
				}	

			}

			posLock = colorLock = false;


			var newblock = new box;
			newblock.x = Math.floor(Math.random() * 3);
			newblock.y = Math.floor(Math.random() * 3);
			newblock.color = this.colors[Math.floor((Math.random() * this.colors.length))];
			this.history.push(newblock);

			var ctx = this.canvas.getContext("2d");
			ctx.fillStyle = newblock.color;
			ctx.fillRect(37+ 100 * newblock.x, 37 + 100 * newblock.y, 75, 75);

			console.log(this.score);
		},

		checkGuess: function(type){
			var current = this.history[this.history.length - 1];
			var prev = this.history[this.history.length - 3];
			if(!current || !prev || this.posLock || this.colorLock) return

			if(type === "position"){
				this.posLock = true;
				if(current.x == prev.x && current.y == prev.y)
					this.score++;
				else
					this.score--;
			} else {
				this.colorLock = true;
				if(current.color == prev.color)
					this.score++;
				else
					this.score--;
			}
		},

		pause: function(){

		},

		play: function(){

		}
	
	};

}();