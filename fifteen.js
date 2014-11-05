window.onload = function(){
	var boundaries = $$("#maze .boundary");
	var end = $("end");
	var start = $("start");
	for (b=0; b<boundaries.length; b++){
		boundaries[b].onmouseover = youLose;
	}	
	end.onmouseover = checkIfYouWin;
	start.onmouseover = resetMaze;
	noCheating();
};

var GRIDWIDTH = 400;
var GRIDHEIGHT = 400;
window.onload = function () {
	var tiles = $$("#puzzlearea div");
	var x,y,bckgrnd ;
	for (tile=0; tile<tiles.length; tile++){
		y=(Math.floor(tile/4)*100)+'px';
		x=((tile%4)*100)+'px';		
		bckgrnd = "-"+x+" -"+y;
		tiles[tile].setStyle({left:x,top:y});
		tiles[tile].setStyle({backgroundPosition:bckgrnd });
		tiles[tile].addClassName('puzzlepiece');
		tiles[tile].onclick = movePuzzlePiece;
	}	
	getMoves();
}

function movePuzzlePiece(e){
	piece = e.target;
	x = piece.getStyle('left').replace('px','');
	y = piece.getStyle('top').replace('px','');
	for (direction in emptySquare.moves){
		console.log(direction);
		if(canMovePuzzlePiece(direction,x,y)){
			console.log(direction);
			swapSpace(piece);
			console.log(piece);
			return;
		}
	}
}

function swapSpace(piece){
	emptyLeft = emptySquare.coords.x+"px";
	emptyTop = emptySquare.coords.y+"px";
	piece.setStyle({left:emptyLeft,top:emptyTop});
	emptySquare.coords.x = x;
	emptySquare.coords.y = y;
	getMoves();
}

function canMovePuzzlePiece(direction ,x,y){
	move = emptySquare.moves[direction];
	return move!=null && move.x == x && move.y == y;
}


function getMoves(){
	var x = emptySquare.coords.x;
	var y = emptySquare.coords.y;
    emptySquare.moves = { "up":getvalidMove(x,y-100),
	      "down": getvalidMove(x,y+100),
	      "left": getvalidMove(x-100,y),
	      "right":getvalidMove(x+100,y)
       };
	
}

function getvalidMove(x,y){
	if(isValidMove(x, y)){
		return {'x':x,'y':y};
	}
}

function isValidMove(x, y){
	return x<GRIDWIDTH&&x>=0&&y<GRIDHEIGHT&&y>=0&&x%100==0&&y%100==0;
}


var emptySquare = {
	coords:{"x":GRIDWIDTH-100,"y":GRIDHEIGHT-100},
	moves :{}
}