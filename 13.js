(function () {
"use strict";
var b1,b2,j1,j2,j3,c1,c2,playGame;
var monitor = {
	resolution: { width: 384, height: 272 },
	pixelSize: 2
};
var dt = initData();
function initData() {
	dt = {	
		pal : [
			// 0  1      2      3         4         5      6         7         8         9         a         b         c         d         e
			"", "000", "FFF", "9f9f9f", "31302f", "f00", "42362a", "9d986e", "645c51", "271d13", "E4B34D", "A8751A", "D4A03B", "A1F8F6", "0078F8"
		],	
		tiles: [
			[	// 1 - wall block
				[3,1,0,0],	
				"17002"+"103f0"+"107f0"+"10bf0"+"10ff0"+"17101"+"1f002"+"13402"+"1b402"+"13c02"+"1bc02"+"17802"+"1f802"
			],
			[	// 2 - score top left
				[6,7,8,0],
				b1="100f0"+"2010e"+"153a0"+"25401"+"23510"+"23609"
			],
			[	// 3 - score top right
				[6,7,8,0],
				b1,
				true
			],
			[	// 4 - score bottom left
				[6,7,8,9],
				b2="2000f"+"23009"+"33a10"+"25a01"+"35ca0"+"31fe0"
			],
			[	// 5 - score bottom right
				[6,7,8,9],
				b2,
				true
			],
			[	// 6 - score middle top
				[6,7,8,0],
				"100f0"+"103f0"
			],
			[	// 7 - score middle bottom
				[6,7,8,9],
				"30ff0"+"30cf0"
			],
			[	// 8 - jail door
				[7,6,4,0],	
				"1000f"+"1300f"+"1600f"+"1900f"+"1c00f"+"1f00f"+"21111"+"21d11"+"2d711"
			],
			[	// 9 - sea side 1 - curve
				[10,14,13,0],	
				"130cb"+"21011"+"23211"+"21413"+"23811"+"23a31"+"26a11"+"28c11"+"2aa31"+"2dc21"
			],
			[	// a - sea side 1 - horizontal
				[10,14,13,0],	
				"100fb"+"20c11"+"22a31"+"26811"+"28a11"+"06a11"+"2ac31"+"2ea11"
			],
			[	// b - sea side 1 - vertical
				[10,14,13,0],	
				"130cf"+"21e11"+"23a13"+"25811"+"23611"+"03811"+"21213"+"23011"
			],
			[	// c - sea 
				[10,14,13,0],	
				"100ff"
			],
			[	// d - sand
				[10,11,12,0],	
				"13100"+"14200"+"1b400"+"23600"+"27600"+"2d600"+"25900"+"19900"+"13a00"+"27b00"+"1cc00"+"15d00"+"2cd10"
			],
			[	// e - jail placeholder
				[0,1,0,0],	
				"100ff"
			],
			[	// f - cloud top left
				[0,13,2,1],	
				c1="239c6"+"157a0"+"138c0"+"12930"+"12a10"+"11b20"+"11c13"+"3fb04"+"38b14"
			],
			[	// g - cloud top right
				[0,13,2,1],
				c1,	
				true
			],
			[	// h - cloud bottom left
				[0,13,2,1],	
				c2="230c6"+"11013"+"11420"+"12510"+"12630"+"137c0"+"158a0"+"3f001"+"3f301"+"38011"+"38311"
			],
			[	// i - cloud bottom right
				[0,13,2,1],	
				c2,
				true
			],
			[	// j - bridge
				[7,6,4,0],	
				"1000f"+"1300f"+"1600f"+"1900f"+"1c00f"+"1f00f"
			],
			[	// k - knight 1 - enemy
				[0,2,3,4],	
				"26855"+"14077"+"36251"+"38411"+"30855"+"26871"+"1e811"+"2e017"+"36a11"+"3aa11"+"35e11"+"3ae11"
			],
			[	// l - knight 2 - templar
				[0,5,3,4],	
				"25045"+"24103"+"2a103"+"35340"+"37401"+"35640"+"24764"+"25c41"+"35e11"+"38e11"+"33706"+"34c01"+"3ac01"+"3b805"+"3c904"+"3db02"+"3ed00"+"16820"+"17900"+"15902"+"16a20"+"19902"+"17b00"+"16c20"
			]
		],
		scene: [[[	"266666666666666666666663"+
					"477777777777777777777775"+		
					"1000dd00000000d0bcccccc1"+
					"10d00d000d000d00bcccccc1"+				
					"10000000000d000dbcccccc1"+						
					"1000d0000d000000bcccccc1"+				
					"10000d00000000009aajaaa1"+
					"10000000d0000d0000000d01"+
					"100d00000000000d0d000001"+
					"100000d0000d0000000d0001"+
					"10d0000000000000000000d1"+								
					"1000d00000000000000d0001"+
					"10000000d000d000d0000001"+
					"100000d00000000000118111"+
					"10d0000000d00d00001eeee1"+
					"1000d0000000000d001eeee1"+
					"111111111111111111111111"
		]]],
		strings: {splash:"The myth tells us that on Friday, 13 October 1307, the Knights Templar were arrested, charged with heresy, immorality and abuses. The fear of Friday the 13th was born.<br/><br/>Save 13 knights from jail, and help them to board the ship to a new world.<span id='btn-play' class='lnk-txt' style='margin-top:"+4*16*monitor.pixelSize+"px;'>Play</span>",over:"You loose!<br/><br/>Oh, forever unlucky Friday the 13th!<span id='btn-play' class='lnk-txt' style='margin-top:"+8*16*monitor.pixelSize+"px;'>Play again</span>",win:"You win!<br/><br/>You saved the World from Friday the 13th curse!<span id='btn-play' class='lnk-txt' style='margin-top:"+5*16*monitor.pixelSize+"px;'>Play again</span>"},
		spriteHTML: [],
		curScene: -1,
		coins: 0,
		mapHTML: "",
		keys: [],
		interval: (dt && dt.interval) || 0,
		size: 16*monitor.pixelSize,
		knights: [],
		enemies: [],
		numEnemies: (dt && dt.numEnemies) || 5,
		kJailed: 0,
		kShipped: 0,
		activeScene: "SPLASH"
	};
	
	// prepare sprite tiles
	for (var i = 0; i < dt.tiles.length; i++) 
	{
		var b = 0;
		var pix = (dt.tiles[i][1] + "");
		
		while (b < pix.split("").length)
		{
			dt.spriteHTML[i] = (
				dt.spriteHTML[i] || 
				"<div style='width:" + dt.size + "px; height:" + dt.size + "px;" +
				((dt.pal[dt.tiles[i][0][0]] !== "") ? 
					("background-color:#" + dt.pal[dt.tiles[i][0][0]]) :
					"") + 
				"' >"
			) + 

			((dt.tiles[i][0][parseInt(pix[b],16)] !== "") ? 
			("<div style='" +
			"left:" + (dt.tiles[i][2] ? ((16)-parseInt(pix[b+1],16) - (parseInt(pix[b+3],16)+1)) : parseInt(pix[b+1],16))*monitor.pixelSize + "px;" +
			"top:" + parseInt(pix[b+2],16)*monitor.pixelSize + "px;" +
			"width:" + (parseInt(pix[b+3],16)+1)*monitor.pixelSize + "px;" +
			"height:" + (parseInt(pix[b+4],16)+1)*monitor.pixelSize + "px;" +
			"background-color:#" + dt.pal[dt.tiles[i][0][parseInt(pix[b],16)]] + ";" +
			"overflow:hidden;" +
			"'></div>") :
			"") +

			( (b+=5) >= pix.length ? "</div>" : "");
		}
	}
	
	return dt;
}

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
	}
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
	}
}());

document.onkeydown = document.onkeyup = function(e) {
	dt.keys[(e||window.event).keyCode] = (e||window.event).type === "keydown";
};

// is tile at (x,y) blocking?
function block(x, y) {
	var layer;
	
	for (var l = 0; l < dt.map.length; l++)
	{
		layer = dt.map[l].split("");
		if (	layer[Math.floor(y/(dt.size)) * 24 + Math.floor(x/(dt.size))] !== "0" &&
				parseInt(layer[Math.floor(y/(dt.size)) * 24 + Math.floor(x/(dt.size))], 16) < 12 ) {
			return true;	// block if at least one layer has blocking element in given position
		}
	}
	
	return false;
}

// check collision between Knight and Enemies
function collide(k, e) {
	var kw,kh,ew,eh;
	kw = kh = ew = eh = 16*(monitor.pixelSize/2);
	return ((	( k.newPos.y >= e.newPos.y && k.newPos.y <= (e.newPos.y + eh) ) && 
				( ( k.newPos.x <= e.newPos.x && (k.newPos.x + kw) >= e.newPos.x ) || ( k.newPos.x >= e.newPos.x && k.newPos.x <= (e.newPos.x + ew) ) ) ) ||	
			(	( k.newPos.y <= e.newPos.y && (k.newPos.y + kh) >= e.newPos.y ) &&
				( ( k.newPos.x <= e.newPos.x && (k.newPos.x + kw) >= e.newPos.x ) || ( k.newPos.x >= e.newPos.x && k.newPos.x <= (e.newPos.x + ew) ) ) )
	);
}	

function $(selector, el) { 
	el = el ? el : document;
	return el.querySelector(selector);  
}

// sprite object
function mSprite(o) {
	// properties
	this.id = o.id;
	this.enemy = o.enemy || false;
	this.start = o.start;
	this.mov = (o.enemy ? {x: 1, y: 1} : {x: 0, y: 0});
	this.oldPos = {x: 0, y: 0};
	this.newPos = {x: 0, y: 0};
	this.dirX = 1;
	this.html = o.html;
	this.state = o.state || "A";
	this.element = null;
	
	// methods
	this.draw = function() {	// create sprite DOM element and add it to page (to "game" element)
		dt.dom.game.innerHTML +=	"<div id='"+(o.enemy ? "enemy_" : "")+"mSprite_"+ o.id +"' class='"+(o.enemy ? "enemy" : "knight")+"' style='" +
										"left:" + this.start.x*dt.size + "px;" +
										"top:" + this.start.y*dt.size + "px;" +
										"width:" + dt.size + "px;" +
										"height:" + dt.size + "px;'>" + 
										this.html +
									"</div>";
													
		return this;
	};
	
	this.getSprite = function() {	// return sprite DOM element
		return $("#"+(o.enemy ? "enemy_" : "")+"mSprite_"+this.id);
	};	
	
	this.setNewPos = function() {
		this.newPos = {
			x : Math.min(24*(dt.size)-(dt.size),
				Math.max(0,
					(this.oldPos.x = parseInt(this.getSprite().style.left || 0, 10)) + 
					(this.mov.x =
						(this.enemy ?
							(dt.activeKnight.newPos.x <= this.oldPos.x ? 
								Math.max(-2+Math.random(), --this.mov.x+Math.random()) : // speed to left
								(
									dt.activeKnight.newPos.x >= this.oldPos.x ? 
									Math.min(2+Math.random(), ++this.mov.x+Math.random()) :	// speed to right
									(	Math.abs(this.mov.x) > 0.7 *monitor.pixelSize ?
										(this.mov.x < 0 ? (this.mov.x+0.7*monitor.pixelSize) : (this.mov.x-0.7*monitor.pixelSize)) :
										0
									)
								)
							) :
						(this.state === "J" || this.state === "S") ?
						this.oldPos.x >= (21*(dt.size)-(dt.size)) ? (--this.mov.x+Math.random()) : (++this.mov.x+Math.random()) :
						(dt.keys[37] ?
							Math.max(-4, --this.mov.x) :		// speed to left
							(
								dt.keys[39] ? 
								Math.min(4, ++this.mov.x) :	// speed to right
								(	Math.abs(this.mov.x) > 0.7*monitor.pixelSize ? 
									(this.mov.x < 0 ? (this.mov.x+0.7*monitor.pixelSize) : (this.mov.x-0.7*monitor.pixelSize)) :
									0
								)
							)
						)
					)
					)
				)
			),
			y : Math.min(24*(dt.size)-(dt.size),
				Math.max(0,
					(this.oldPos.y = parseInt(this.getSprite().style.top || 0, 10)) + 
					(this.mov.y =
						(this.enemy ?		
							(dt.activeKnight.newPos.y <= this.oldPos.y ? 
								Math.max(-2+Math.random(), --this.mov.y+Math.random()) : // speed up
								(
									dt.activeKnight.newPos.y >= this.oldPos.y ?  
									Math.min(2+Math.random(), ++this.mov.y+Math.random()) :	// speed down
									(Math.abs(this.mov.y) > 0.7*monitor.pixelSize ? (this.mov.y < 0 ? (this.mov.y+0.7*monitor.pixelSize) : (this.mov.y-0.7*monitor.pixelSize)) : 0)
								)
							) :
							(this.state === "J" || this.state === "S") ?
							0 :
							(dt.keys[38] ? 
								Math.max(-4, --this.mov.y) : // speed up
								(
									dt.keys[40] ?
									Math.min(4, ++this.mov.y) : // speed down
									(	Math.abs(this.mov.y) > 0.7*monitor.pixelSize ? 
										(this.mov.y < 0 ? (this.mov.y+0.7*monitor.pixelSize) : (this.mov.y-0.7*monitor.pixelSize)) : 
										0
									)
								)
							)
						)
					)
				)
			)
		};
	};
	
	this.setLeft = function() {
		this.getSprite().style.left = 
		(this.newPos.x = Math.round(
			this.mov.x ?
			(
				this.mov.x < 0 ? 
				(
					(block(this.newPos.x, this.oldPos.y) || block(this.newPos.x, this.oldPos.y + (15*monitor.pixelSize))) ? 
					(Math.floor(this.oldPos.x/(dt.size))*(dt.size)) : 
					this.newPos.x
				) :
				(
					(block(this.newPos.x + (dt.size), this.oldPos.y) || block(this.newPos.x + (dt.size), this.oldPos.y + (15*monitor.pixelSize))) ? 
					(Math.ceil(this.oldPos.x/(dt.size))*(dt.size)) : 
					this.newPos.x
				)
			) :
			this.oldPos.x
		)) + "px";
	};
	
	this.setTop = function() {
		this.getSprite().style.top = 
		(this.newPos.y = Math.round(
			this.mov.y ?
			(
				this.mov.y < 0 ? 
				(
					(block(this.oldPos.x, this.newPos.y) || block(this.oldPos.x, this.newPos.y + (15*monitor.pixelSize))) ? 
						(Math.floor(this.oldPos.y/(dt.size))*(dt.size)) : this.newPos.y
				) :
				(
					(block(this.oldPos.x, this.newPos.y + (dt.size)) || block(this.oldPos.x + (dt.size), this.newPos.y + (15*dt.pixelSie))) ? 
					(Math.ceil(this.oldPos.y/(dt.size))*(dt.size)) : 
					this.newPos.y
				)
			) :
			this.oldPos.y
		)) + "px";
	};
	
	this.move = function() {
		if (this.state !== "C")
		{
			this.setNewPos();		// set where the sprite wants to go	
			this.setLeft();			// collision detection on x axis
			this.setTop();			// collision detection on y axis
		}			
	};
	
	this.toJail = function() {
		dt.kJailed++;
		this.state = "J";
	};
	
	this.toShip = function() {
		dt.kShipped++;
		this.state = "S";
	};
	
	this.imprecate = function() {
		dt.dom.game.innerHTML +=	"<div id='cloud' style='position: absolute;left:"+(this.newPos.x+dt.size/2)+"px;top:"+(this.newPos.y-dt.size)+"px;width:"+64+"px;height:"+128+"px;'>" +
										"<div style='left: 0; top: 0;'>"+dt.spriteHTML[14]+"</div>" +
										"<div style='left: 32px; top: 0;'>"+dt.spriteHTML[15]+"</div>" +
										"<div style='left: 0px; top: 32px;'>"+dt.spriteHTML[16]+"</div>" +
										"<div style='left: 32px; top: 32px;'>"+dt.spriteHTML[17]+"</div>" +
									"</div>";
	};
	
	// finalize
	if (o.collection) {o.collection.push(this);}	// insert into collection			
	return this;
}

function drawText(o)
{
	removeText();
	var h =	o.height || 14*dt.size,
		w = o.width || 22*dt.size,
		l = o.left || 1*dt.size,
		t = o.top || 2*dt.size,
		s = o.string || "";
	dt.dom.game.innerHTML += "<p id='msg-text' class='arcadeText' style='padding:"+1*dt.size+"px; line-height:"+1*dt.size+"px; width:"+w+"px; height:"+h+"px; left:"+l+"px; top:"+t+"px;'>"+s+"</p>";
}

function removeText()
{
	if ($("#msg-text")) {dt.dom.game.removeChild($("#msg-text"));}
}

function txtColor() 
{
	var blocks = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 3; i++) {
		color += blocks.substr(Math.random()*blocks.length, 1);
	}
	return color;							
}

function setScene(o)
{
	switch (o)
	{
		// splash monitor
		case "SPLASH":
			drawText({ string: dt.strings.splash });
			$("#btn-play").addEventListener("click", function(){ dt.activeScene = "GAME"; playGame(); }, false);				
			(function animate() {		
				cancelAnimationFrame(dt.interval);
				dt.interval = requestAnimationFrame(animate, $("#btn-play"));
				$("#btn-play").style.color = txtColor();				
			})();						
			break;
		
		// standard gameplay
		case "GAME":
			
			removeText();
			
			// draw existing knight (Jail or Ship)
			for (var k=0; k < dt.knights.length; k++)
			{
				var kn = dt.knights[k]; 
				switch (kn.state)
				{
					case "J":	// jail
						kn.start = kn.newPos = {x:20+Math.random(),y:15};
						kn.draw();
						break;
					case "S":	// ship
						kn.start = kn.newPos = {x:20+Math.random(),y:3};
						kn.draw();
						break;
				}
			}
			
			// create knight sprite and add it to "game" div
			dt.activeKnight =	new mSprite({	
									id: dt.knights.length,
									start: {x:1,y:15},
									html: "<div style='left:"+(0*16)+"px;'>"+dt.spriteHTML[20]+"</div>",
									collection: dt.knights
								}).draw();
			
			//create enemies
			for (var z=0; z<dt.numEnemies; z++)
			{
				new mSprite({
					id: z,
					start: {x: (Math.floor(Math.random()*19)+3), y: (Math.floor(Math.random()*14)+2)},
					html: "<div style='left:"+(0*16)+"px;'>"+dt.spriteHTML[19]+"</div>",
					collection: dt.enemies,
					enemy: true
				}).draw();
			}	
			
			// game loop
			(function animate() {		
				cancelAnimationFrame(dt.interval);
				dt.interval = requestAnimationFrame(animate, dt.dom.game);
				
				$("#title").style.color = txtColor();
				
				// update knight sprite position (from "knights" array)
				for (var k=0; k < dt.knights.length; k++) 
				{
					dt.knights[k].move();
					
					// knight reaches ship
					if ( !dt.breakScene && dt.activeKnight.newPos.x >= (18*(dt.size)) && dt.activeKnight.newPos.x <= (19*(dt.size)+dt.size) && (dt.activeKnight.newPos.y <= (6*(dt.size))) )
					{
						dt.breakScene = true;
						dt.activeKnight.state = "S";						
						dt.activeScene = "SHIP";
						dt.callbackTime = {time: new Date().getTime(), delay: 100};
					}
				}
				
				// update enemies position
				for (var e=0; e<dt.enemies.length; e++) 
				{
					dt.enemies[e].move(); 
					
					// enemy catches knight
					if(!dt.breakScene && collide(dt.activeKnight, dt.enemies[e]))
					{
						dt.activeKnight.imprecate();
						dt.breakScene = true;
						dt.activeKnight.state = "C";	
						dt.activeScene = "JAIL";
						dt.callbackTime = {time: new Date().getTime(), delay: 3000};
					}
				}
				
				// delaied scenes
				if ( dt.callbackTime && (new Date().getTime() - dt.callbackTime.time) >= dt.callbackTime.delay )
				{			
					setScene(dt.activeScene);
				}
			})();
			break;
		
		// knight caught and sent to jail
		case "JAIL":
			dt.activeKnight.toJail();				
			
			// if 13 knights have been jailed game is over
			if (dt.kJailed === 13)
			{
				dt.activeScene = "OVER";
			}
			// else game goes on
			else
			{
				if (dt.numEnemies < 5) {dt.numEnemies--;}
				dt.activeScene = "GAME";
			}
			
			playGame();
			break;
			
		case "SHIP":
			dt.activeKnight.toShip();
			
			// if 13 knights are on board player wins
			if (dt.kShipped === 13)
			{
				dt.activeScene = "WIN";
			}
			// else game goes on
			else
			{
				dt.numEnemies++;
				dt.activeScene = "GAME";
			}
			
			playGame();
			break;
			
		case "WIN":
			drawText({ string: dt.strings.win });
			$("#btn-play").addEventListener("click", function(){ dt = initData(); dt.activeScene = "GAME"; playGame(); }, false);
			(function animate() {		
				cancelAnimationFrame(dt.interval);
				dt.interval = requestAnimationFrame(animate, $("#btn-play"));
				$("#btn-play").style.color = txtColor();				
			})();
			break;
			
		case "OVER":
			drawText({ string: dt.strings.over });
			$("#btn-play").addEventListener("click", function(){ dt = initData(); dt.activeScene = "GAME"; playGame(); }, false);
			(function animate() {		
				cancelAnimationFrame(dt.interval);
				dt.interval = requestAnimationFrame(animate, $("#btn-play"));
				$("#btn-play").style.color = txtColor();				
			})();
			break;
	}
	
	dt.callbackTime = null;
}
var ra = 0;
function colorStripes() {		
	cancelAnimationFrame(ra);
	ra = requestAnimationFrame(colorStripes, $("#colors"));
	var h = "", t = 20;
	for (var i = 0; i < 5; i++) {
		h += "<div class='stripe' style='top:"+t*i+"%; background:"+txtColor()+";'></div>";
	}
	$("#colors").innerHTML = h;
}

// start the game
window.onload = playGame = function() {	
	
	// reset game vars
	dt = {
		pal: dt.pal,
		tiles: dt.tiles,
		strings: dt.strings,
		spriteHTML: dt.spriteHTML,
		mapHTML: "",
		curScene: dt.curScene+1,
		scene: dt.scene,
		map: dt.scene[((dt.curScene+1)%dt.scene.length)][0],
		coins: 0,
		keys: [],
		interval: dt.interval,
		size: dt.size,
		knights: dt.knights,
		enemies: [],
		numEnemies: dt.numEnemies,
		activeKnight: dt.activeKnight,
		kJailed: dt.kJailed,
		kShipped: dt.kShipped,
		breakScene: false,
		bridge: null,
		callbackTime: null,
		activeScene: dt.activeScene,
		dom: {container: $("#container"), game: $("#game")}
	};
	
	// set game dt.size
	dt.dom.container.style.width = dt.dom.game.style.width = monitor.resolution.width * monitor.pixelSize + "px";
	dt.dom.container.style.height = dt.dom.game.style.height = monitor.resolution.height * monitor.pixelSize + "px";	

	// draw game map
	var layer, mapSlice;	
	for (var l = 0; l < dt.map.length; l++)
	{
		layer = dt.map[l].split("");
		for (var i = 0; i < layer.length; i++)
		{
			mapSlice="";
			if (layer[i] !== "0")
			{
				mapSlice =	"<div id='map_sprite_"+l+"_"+i+"' class='mapsprite' style='width:" + dt.size + "px; height:" + dt.size + "px; left:" + ((i%24)*16)*monitor.pixelSize + "px; top:" + (Math.floor(i/24)*16)*monitor.pixelSize + "px;'>" +
								"<div style='height:"+dt.size+"px; width:"+48*monitor.pixelSize+"px;'>" +
									dt.spriteHTML[parseInt(layer[i],36)-1] +
								"</div>" +
							"</div>";
			}
			
			dt.mapHTML += mapSlice;
		}
	}
	
	// draw objects on monitor	
	dt.dom.game.innerHTML = dt.mapHTML +
								(dt.activeScene === "GAME" ?
								"<p id='title' class='arcadeText' style='line-height:"+dt.size+"px; left:"+dt.size+"px;'>13th oF fAmE</p>"+"<p id='jail' class='arcadeText' style='"+dt.size+"px;line-height:"+1*dt.size+"px;'>jail:<span id='jail-txt'>"+dt.kJailed+"</span></p><p id='ship' class='arcadeText' style='"+dt.size+"px;line-height:"+1*dt.size+"px;'>ship:<span id='ship-txt'>"+dt.kShipped+"</span></p>" :
								"<p id='title' class='arcadeText' style='line-height:"+dt.size+"px; left:"+dt.size+"px;'>13th oF fAmE</p>");
	
	setScene(dt.activeScene);
	
	colorStripes();
	
};
}());