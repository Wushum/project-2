/*
*Sliding Puzzle Game
*Created by Ryan Olson, 2012
*Feel free to use this however you want.
*/
var game = {
        cols :null,
        rows :null,
        pieces : [],
        shuffling : false,
        size:null,
        progressbar : $("#progress #bar"),
        getPieces : function(){
                return this.pieces;
        },
        
        makeGrid: function(cols, rows){
                var grid = $("#grid"),
                        table = $("<table>"),
                        count = cols*rows,
                        piece,
                        className,
                        odd;
                        
                this.size = count;
                this.pieces = [];
                
                for(var i=1; i<count; i++){
                        this.pieces.push(i);
                }
                this.pieces.push(" ");
                
                for (var i=0,len=rows; i<len; i++){
                        var tr = $("<tr>");
                        for(var x=0,len=cols; x<len; x++){
                                piece = this.pieces[(this.rows*i + x)];
                                className = (piece == " ") ? "game-blank" : "game-piece";
                                odd = ( (this.rows*i + x)%2 ) ? "even" : "odd";
                                tr.append("<td rel='" + x + "' class='" + className + " " + odd + " slide'>" + piece + "</td>");
                        }
                        table.append(tr);
                }
                grid.html(table);
                
                this.bindShit();
        },
        isMovable: function(el){
                var position = el.attr("rel");
                
                if ( el.prev("td").hasClass("game-blank") || el.next("td").hasClass("game-blank") ){
                        return true;    
                }
                
                if ( el.parent().prev("tr").find("td").eq(position).hasClass("game-blank") || 
                        el.parent().next("tr").find("td").eq(position).hasClass("game-blank") )
                {
                        return true; 
                }
                        
                return false;
        },
        shuffle : function(i){
                var self = this,
                        r = Math.floor(Math.random() * this.size);
                self.progressbar.css({"width" : (100-i)+"%"});
                
                if (i > 0){
                        el = $("#game td").eq(r);
                        if( self.isMovable(el) ){
                                self.movePiece(el);     
                                i--;
                                setTimeout(function(){ self.shuffle(i) }, 1);
                                return;
                        }else{
                                self.shuffle(i);
                                return;
                        }
                }
                $("#grid").removeClass("shuffling");
                self.progressbar.parent().fadeOut();
                this.shuffling = false;
        },
        toggleBlank: function(el, oddeven) {
                $(".game-blank").removeClass("game-blank").addClass(oddeven).addClass("game-piece");
                el.removeClass("game-piece").removeClass(oddeven).addClass("game-blank");
        },
        movePiece: function(el) {
                if( this.isMovable(el) ){
                        $(".game-blank").text( el.text() )
                        el.text(" ");
                        this.toggleBlank(
                                el,
                                (el.hasClass("odd")) ? "odd" : "even");
                }
        },
        bindShit: function(){
                var self = this;
                $(".slide").click(function(check){
                        el = $(this);
                        self.movePiece(el);
                        if(!this.shuffling)
                                self.checkGame();
                });
                
                this.shuffling = true;
                $("#grid").addClass("shuffling");
                this.progressbar.parent().slideDown();
                this.shuffle(100);
        },
        checkGame: function(){
                var currentpieces = [],
                        slidevalue;
                
                if (!this.shuffling){
                        $(".slide").each(function(){
                                slidevalue = $(this).text();
                                currentpieces.push( (slidevalue == " ") ? " " : parseInt(slidevalue, 10) );
                        });
                        for(var i=0,len=currentpieces.length; i<len; i++){
                                if( currentpieces[i] != this.pieces[i] ){
                                        return false;
                                }
                        }
                        alert("YOU WON!");
                }               
        },
        init: function(cols, rows){
                this.cols = parseInt(cols, 10);
                this.rows = parseInt(rows, 10);
                this.makeGrid(this.cols, this.rows);
        }
}; 