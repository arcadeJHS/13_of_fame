(function () {
"use strict";
var b1,b2,c1,c2,playGame;
var monitor = {
	resolution: { width: 384, height: 272 },
	pixelSize: 2
};
var dt = initData();
function initData() {
	dt = {	
		pal : [
			// 0  1      2      3         4         5      6         7         8         9         a         b         c         d         e         f
			"", "000", "FFF", "9f9f9f", "31302f", "f00", "42362a", "9d986e", "645c51", "271d13", "E4B34D", "A8751A", "D4A03B", "A1F8F6", "0078F8", "CBCBCB"
		],	
		tiles: [
			[	// 1 - wall block
				[3,1,0,0], "17002103f0107f010bf010ff0171011f002134021b40213c021bc02178021f802" ],
			[	// 2 - score top left
				[6,7,8,0], b1="100f02010e153a0254012351023609" ],
			[	// 3 - score top right
				[6,7,8,0], b1, true ],
			[	// 4 - score bottom left
				[6,7,8,9], b2="2000f2300933a1025a0135ca031fe0" ],
			[	// 5 - score bottom right
				[6,7,8,9], b2, true ],
			[	// 6 - score middle top
				[6,7,8,0], "100f0103f0" ],
			[	// 7 - score middle bottom
				[6,7,8,9], "30ff030cf0" ],
			[	// 8 - jail door
				[7,6,4,0], "1000f1300f1600f1900f1c00f1f00f2111121d112d711" ],
			[	// 9 - sea side 1 - curve
				[10,14,13,0], "130cb2101123211214132381123a3126a1128c112aa312dc21" ],
			[	// a - sea side 1 - horizontal
				[10,14,13,0], "100fb20c1122a312681128a1106a112ac312ea11" ],
			[	// b - sea side 1 - vertical
				[10,14,13,0], "130cf21e1123a132581123611038112121323011" ],	
			[	// c - stone
				[10,2,11,16], "2422023310273302241029430215102b510216042c711" ],
			// blocking edge: 13 ------------------------------
			[	// d - sea 
				[10,14,13,0], "100ff" ],
			[	// e - sand
				[10,11,12,0], "13100142001b40023600276002d600259001990013a0027b001cc0015d002cd10" ],
			[	// f - jail placeholder
				[0,1,0,0], "100ff" ],			
			[	// g - bridge
				[7,6,4,0], "1000f1300f1600f1900f1c00f1f00f" ],
			[	// h - knight 1 - enemy
				[0,2,3,4], "2685514077362513841130568268711e8112e01736a113aa1135e113ae11" ],
			[	// i - knight 2 - templar
				[0,5,3,4], "25045241032a1033534037401356402476425c4135e1138e113370634c013ac013b8053c90416820179001590216a201990217b0016c20" ],
			[	// l - ship - bottom - 0
				[14,7,6,2], "110e1122d0143b01649018573198631ac501bd411cf30210e0243602b4402c5002d601298302e8002d9202ce202ff00" ],
			[	// m - ship - bottom - 1
				[14,7,6,2], "100ff20050270812d2002e3002f40020420235b02092023a3027b802cc002dd002ee0120f20" ],
			[	// n - ship - bottom - 2
				[14,7,6,2], "100ff200a22b14120500216e020bf0" ],
			[	// o - ship - bottom - 3
				[14,7,6,2], "100ff210e0201f0202b02e2002f301235c0206202270023800249002f90020af02fe0029f50" ],
			[	// p - ship - bottom - 4
				[14,7,6,2], "100f5106e1108d0109c110bb010ca010d9010e7010f60200f0201902f300224d0205102e60129840209802c90120b002bb0021c102ac0023d6020e3027e0026f00" ],
			[	// q - ship - bottom - 5
				[14,7,6,2], "200e0101c02d1001024025200203302041020500" ],
			[	// r - ship - middle - 0
				[14,7,6,2], "21be011ce011d0222d0216d0227d021cd022dd02" ],
			[	// s - ship - middle - 1
				[14,7,6,2], "20b7010c6011d0222d0216d0227c033b0443c5331c8201f900" ],
			[	// t - ship - middle - 2
				[14,7,6,2], "3007938207396033a8023ba001094015a401ab101c02f1bd022f0061f709" ],
			[	// u - ship - middle - 3
				[14,7,6,2], "340b0351a2344b1336c033780328703296031a0033a3031b102070410c0311c1021d0213b4018a401d920" ],
			[	// v - ship - middle - 4
				[14,7,6,2], "3004635105363033750134730187102a7001384010920" ],
			[	// w - ship - top - 0
				[14,7,6,2], "3fa053eb043dd023cf00" ],
			[	// x - ship - top - 1
				[14,7,6,2], "1c1072d10715730196601c9162e9063972035850309a030a9130c8130e713e7103f800" ],
			[	// y - ship - top - 2
				[14,7,6,2], "11540106003166030790308b0309d032ad033bc234eb1" ],
			[	// z - ship - top - 3
				[14,7,6,2], "30b0431c1333d0234f00" ],			
			[	// cloud top left
				[0,13,2,1], c1="239c6157a0138c01293012a1011b2011c133fb0438b14" ],
			[	// cloud top right
				[0,13,2,1], c1, true ],
			[	// cloud bottom left
				[0,13,2,1], c2="230c611013114201251012630137c0158a03f0013f3013801138311" ],
			[	// cloud bottom right
				[0,13,2,1], c2, true ]
		],
		scene: [[[	"266666666666666666666663"+
					"477777777777777777777775"+		
					"1000ee00000000e0bdddddd1"+
					"10e00e000e000e00bduvwxd1"+				
					"1000c000000e0c0ebpqrstd1"+						
					"1000e0000e000000bjkgmno1"+				
					"10e00000000000009aagaaa1"+
					"100000c0cccc0e0000000e01"+
					"10000cc0000c000e0e000001"+
					"1c0000c0cccc000c000e0001"+
					"10e000c0000c0000e00c00e1"+								
					"100000c0cccc0000000e0001"+
					"100e0000e000e000e0000001"+
					"100000e0000000c000118111"+
					"10e0000000e00e00001ffff1"+
					"1000e000000c000e001ffff1"+
					"111111111111111111111111"
		]]],
		strings: {splash:"The myth tells us that on Friday, 13 October 1307, the Knights Templar were arrested, charged with heresy, immorality and abuses. The fear of Friday the 13th was born.<br/><br/>Save 13 knights from jail, and help them to board the ship to a new world.<span id='btn-play' class='lnk-txt' style='margin-top:"+4*16*monitor.pixelSize+"px;' title='Press me to play!'>load\"*\",8,1</span>",over:"You loose!<br/><br/>Oh, forever unlucky Friday the 13th!<span id='btn-play' class='lnk-txt' style='margin-top:"+8*16*monitor.pixelSize+"px;'>Play again</span>",win:"You win!<br/><br/>You saved the World from Friday the 13th curse!<span id='btn-play' class='lnk-txt' style='margin-top:"+5*16*monitor.pixelSize+"px;'>Play again</span>"},
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
				parseInt(layer[Math.floor(y/(dt.size)) * 24 + Math.floor(x/(dt.size))], 16) < 13 ) {
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
								Math.max(-1.5+Math.random(), --this.mov.x+Math.random()) : // speed to left
								(
									dt.activeKnight.newPos.x >= this.oldPos.x ? 
									Math.min(1.5+Math.random(), ++this.mov.x+Math.random()) :	// speed to right
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
								Math.max(-1.5+Math.random(), --this.mov.y+Math.random()) : // speed up
								(
									dt.activeKnight.newPos.y >= this.oldPos.y ?  
									Math.min(1.5+Math.random(), ++this.mov.y+Math.random()) :	// speed down
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
										"<div style='left: 0; top: 0;'>"+dt.spriteHTML[33]+"</div>" +
										"<div style='left: 32px; top: 0;'>"+dt.spriteHTML[34]+"</div>" +
										"<div style='left: 0px; top: 32px;'>"+dt.spriteHTML[35]+"</div>" +
										"<div style='left: 32px; top: 32px;'>"+dt.spriteHTML[36]+"</div>" +
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
			applyColors();			
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
						kn.start = kn.newPos = {x:20+Math.random(),y:4};
						kn.draw();
						break;
				}
			}
			
			// create knight sprite and add it to "game" div
			dt.activeKnight =	new mSprite({	
									id: dt.knights.length,
									start: {x:1,y:15},
									html: "<div style='left:"+(0*16)+"px;'>"+dt.spriteHTML[17]+"</div>",
									collection: dt.knights
								}).draw();
			
			//create enemies
			for (var z=0; z<dt.numEnemies; z++)
			{
				new mSprite({
					id: z,
					start: {x: (Math.floor(Math.random()*19)+3), y: (Math.floor(Math.random()*14)+2)},
					html: "<div style='left:"+(0*16)+"px;'>"+dt.spriteHTML[16]+"</div>",
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
					if ( !dt.breakScene && dt.activeKnight.newPos.x >= (18*(dt.size)) && dt.activeKnight.newPos.x <= (19*(dt.size)+dt.size) && (dt.activeKnight.newPos.y <= (5*(dt.size))) )
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
				if (dt.numEnemies > 5) {dt.numEnemies--;}
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
			applyColors();
			break;
	}
	
	dt.callbackTime = null;
}

function applyColors() {		
	cancelAnimationFrame(dt.interval);
	dt.interval = requestAnimationFrame(applyColors, $("#colors"));
	var h = "", t = 2;
	for (var i = 0; i < 50; i++) {
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
	
};
}());