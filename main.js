var origin = 0;
var winCounter = 0;
var h = 22;
var w = 48;
//h = 22   and   w = 48
var board = Array(h);
for (var i = 0; i < h; i++) {
    board[i] = Array(w).fill(0);
}
//board is created



for(var j = 0; j < h; j++){
    for(var i = 0; i < w; i++){
        if((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)){
            var temp = document.createElement("a");
        }else{
            var temp = document.createElement("b");
        }
        temp.id = j + '-' + i;
        document.body.appendChild(temp);
    }
    var jump = document.createElement("p");
    document.body.appendChild(jump);
}
//html board is created




function where(e) {
    var targ;
    if (!e) {
      var e = window.event;
    }
    if (e.target) {
      targ = e.target;
    } else if (e.srcElement) {
      targ = e.srcElement;
    }
    var tname;
    tname = targ.id;
    if(targ.tagName == 'A' || targ.tagName == 'B'){
        var ro = parseInt(tname.substring(0,tname.indexOf('-')));
        var co = parseInt(tname.substring(tname.indexOf('-') + 1));
        if(e.button == 0){
            if(document.getElementById(ro + "-" + co).style.cssText == ""){
                change(ro, co);
            }
        }else if(e.button == 2){
            if(document.getElementById(ro + "-" + co).style.cssText != ""){
                document.getElementById(ro + "-" + co).style.backgroundImage = '';
            }else if(document.getElementById(ro + "-" + co).className != 'visited'){
                document.getElementById(ro + "-" + co).style.backgroundImage = 'url(flag.png)';
            }
        }
    }
  }
//Determines what's pressed 




//Main method
function change(r,c) {
    if(origin == 0){
        if(h == 3 && w == 3 && r == 1 && c == 1){
            return win();
        }
        for(var i = 0; i < Math.floor(h * w / 8); i++){
            var x = Math.floor(Math.random() * h);
            var y = Math.floor(Math.random() * w);
            if(board[x][y] >= 10){
                i--;
                continue;
            }
            if(x >= r-1 && x <= r+1 && y >= c-1 && y <= c+1){
                i--;
                continue;
            }
            board[x][y] = 10;
            if(x + 1 < h && y + 1 < w){
                board[x+1][y+1]++;
            }
            if(x + 1 < h){
                board[x+1][y]++;
            }
            if(y + 1 < w){
                board[x][y+1]++;
            }
            if(y - 1 >= 0 && x - 1 >= 0){
                board[x-1][y-1]++;
            }
            if(x - 1 >= 0){
                board[x-1][y]++;
            }
            if(y - 1 >= 0){
                board[x][y-1]++;
            }
            if(x + 1 < h && y - 1 >= 0){
                board[x+1][y-1]++;
            }
            if(x - 1 >= 0 && y + 1 < w){
                board[x-1][y+1]++;
            }
        }
        origin++;
    }
    if(document.getElementById(r + "-" + c).className != 'visited'){
        if(board[r][c] >= 10){
            document.getElementById(r + "-" + c).style.backgroundColor = 'Red';
            lose();
        }else{
            winCounter++;
            if(Math.floor(h * w / 8) + winCounter == h * w){
                win();
            }
            document.getElementById(r + "-" + c).className = 'visited';
            document.getElementById(r + "-" + c).style.backgroundColor = '#5cc4ec';
            if(board[r][c] != 0){
                document.getElementById(r + "-" + c).innerHTML = board[r][c];
            }else{
                if(r + 1 < h && c + 1 < w){
                    change(r+1, c+1);
                }
                if(r + 1 < h){
                    change(r+1, c);
                }
                if(c + 1 < w){
                    change(r, c+1);
                }
                if(c - 1 >= 0 && r - 1 >= 0){
                    change(r-1, c-1);
                }
                if(r - 1 >= 0){
                    change(r-1, c);
                }
                if(c - 1 >= 0){
                    change(r, c-1);
                }
                if(r + 1 < h && c - 1 >= 0){
                    change(r+1, c-1);
                }
                if(r - 1 >= 0 && c + 1 < w){
                    change(r-1, c+1);
                }
            }
        }
    }
    }




    function size() {
        h = parseInt(prompt("Enter the height(Default == 22)", "height"));
        w = parseInt(prompt("Enter the width(Default == 48)", "width"));
        reset();
    }
//Changes size



    function reset() {
        origin = 0;
        var element = document.getElementsByTagName("a"), index;

        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        var element = document.getElementsByTagName("b"), index;

        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        var element = document.getElementsByTagName("p"), index;

        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        board = Array(h);
        for (var i = 0; i < h; i++) {
            board[i] = Array(w).fill(0);
        }
        for(var j = 0; j < h; j++){
            for(var i = 0; i < w; i++){
                if((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)){
                    var temp = document.createElement("a");
                }else{
                    var temp = document.createElement("b");
                }
                temp.id = j + '-' + i;
                document.body.appendChild(temp);
            }
            var jump = document.createElement("p");
            document.body.appendChild(jump);
        }
        document.getElementById('Over').style.display = 'none';
        document.getElementById('Over2').style.display = 'none';
        document.getElementById('winScreen').style.display = 'none';
        winCounter = 0;
    }
//Resets squares to same h and w


    function win(){
        winCounter = 0;
        document.getElementById('winScreen').style.display = 'block';
        document.getElementById('Over2').style.display = 'block';
    }
    function lose(){
        winCounter = 0;
        document.getElementById('Over').style.display = 'block';
        document.getElementById('Over2').style.display = 'block';
    }




//Random:
//const myForm = document.querySelector('#my-form');
//addEventListener('click', onSubmit);