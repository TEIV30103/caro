class game{
    constructor(){
        this.row = game_row;
        this.col = game_col;
        this.arr = [];
        this.khaiBaoArr();
        this.veBanCo();
        this.bot = new botTest2(this);
        this.luot =1;
        this.valueNguoi = value_X;
    }
    khaiBaoArr(){
        for (let i = 0; i < this.row; i++){
            var ar =[];
            for (let j = 0; j < this.col; j++){
                ar.push(value_Empty);
            }
            this.arr.push(ar);
        }
    }
    EmptyArr(){
        for (let i = 0; i < this.row; i++){
            for (let j = 0; j < this.col; j++){
                this.arr[i][j] = value_Empty;
            }
        }
    }
    veBanCo(){

        for(let i = 0; i < this.row; i++){
            var tr = document.createElement("tr");
            for (let j = 0; j < this.col; j++){
                var td = document.createElement("td");
                td.setAttribute("id",i.toString() + j.toString());
                td.addEventListener("click",()=>{
                    if ( this.arr[i][j] != value_Empty){
                        alert("Ô này đã được đánh rồi");
                    }
                    else{
                        this.arr[i][j] = value_X;
                        this.valueOBanCo();
                        this.luot++;
                        setTimeout(() => {
                            this.checkWinGame(i,j);
                            this.bot.botDanh();
                        }, 300);
                        
                    }
                })
                tr.appendChild(td);
            }
            document.getElementById("table").appendChild(tr);
        }
    }
    valueOBanCo(){
        var i1 =0;
        for (let i = 0; i < this.row; i++){
            for (let j = 0; j < this.col; j++){
                if (this.arr[i][j] != value_Empty){
                    i1 =1;
                    if (this.arr[i][j] == value_X){
                        document.getElementById(i.toString() + j.toString()).innerText ="X";
                        document.getElementById(i.toString() + j.toString()).style.color ="red";
                    }
                    else{
                        document.getElementById(i.toString() + j.toString()).innerText ="O";
                        document.getElementById(i.toString() + j.toString()).style.color ="blue";
                    }
                }
            }
        }
        return i1;
    }
    checkWinGame(i,j){
        if (this.checkDoc(i,j) >= 5 || this.checkNgang(i,j) >= 5 || this.checkCheoPhai(i,j) >= 5 || this.checkCheoTrai(i,j) >= 5){
            if (this.luot % 2 == 0){
                document.getElementById("X").style.top = "150px";
                document.getElementById("X").style.right ="40px";
                document.getElementById("X").innerText="X Win";
            }
            else{
                
                document.getElementById("O").style.top = "150px";
                document.getElementById("O").style.right ="40px";
                document.getElementById("O").innerText="O Win";
            }
            setTimeout(() => {
                document.getElementById("X").innerText="X";
                document.getElementById("X").style.top = "10px";
                document.getElementById("X").style.right ="0";

                document.getElementById("O").innerText="O";
                document.getElementById("O").style.top = "10px";
                document.getElementById("O").style.right ="0";
                document.getElementById("table").innerHTML ="";
                this.EmptyArr();
                this.veBanCo();
            }, 3000);
            
        }
    }

    checkDoc(i,j){
        var count =1;
        var val = this.arr[i][j];
        var i1 = i +1;
        if (i1 < game_row){
            while (this.arr[i1][j] == val){
                count ++;
                i1++;
                if (i1 >= game_row) break;
            }
        }
        i1 = i -1;
        if (i1 >= 0){
            while (this.arr[i1][j] == val){
                count ++;
                i1--;
                if (i1 < 0) break;
            }
        }
        
        return count;
    }

    checkNgang(i,j){
        var count =1;
        var val = this.arr[i][j];
        var j1 = j +1;
        if (j1 < game_col){
            while (this.arr[i][j1] == val ){
                count ++;
                j1++;
                if (j1 >= game_col) break;
            }
        }
        j1 = j -1;
        if (j1 >= 0){
            while (this.arr[i][j1] == val){
                count ++;
                j1--;
                if (j1 < 0) break;
            }
        }

        return count;
    }

    checkCheoTrai(i,j){
        var count =1;
        var val = this.arr[i][j];
        var i1 = i +1;
        var j1 = j +1;
        if (i1 < game_row && j1 < game_col){
            while (this.arr[i1][j1] == val){
                count ++;
                i1++;
                j1++;
                if (i1 >= game_row || j1 >= game_col) break;
            }
        }
        i1 = i -1;
        j1 = j -1;
        if (i1 >= 0 && j1 >=0){
            while (this.arr[i1][j1] == val){
                count ++;
                i1--;
                j1--;
                if (i1 < 0 || j1 < 0) break;
            }
        }

        return count;
    }

    checkCheoPhai(i,j){
        var count =1;
        var val = this.arr[i][j];
        var i1 = i -1;
        var j1 = j +1;
        if (i1 >=0 && j1 < game_col){
            while (this.arr[i1][j1] == val){
                count ++;
                i1--;
                j1++;
                if (i1 < 0 || j1 >= game_col) break;
            }
        }
        
        i1 = i +1;
        j1 = j -1;
        if ( i1 < game_row && j1 >=0){
            while (this.arr[i1][j1] == val){
                count ++;
                i1++;
                j1--;
                if (i1 >= game_row || j1 <0) break;
            }
        }
        return count;
    }
}
var g = new game();