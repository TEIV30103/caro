class botTest2{
    constructor(game){
        this.game = game;
        this.valueMay = value_O;
        this.arrDiemTanCong = [0, 3, 24, 192, 1536, 12288, 98304];
        this.arrDiemPhongNgu = [0, 1, 9, 81, 729, 6561, 59049];
    }

    botDanh(){
        if (!this.game.valueOBanCo()){
            this.game.arr[5][5] = this.valueMay();
            this.game.valueOBanCo();
            this.game.luot++;
        }
        else{
            this.timKiemNuocDi();
        }
    }

    timKiemNuocDi(){
        var diemMax = 0;
        var x =0;
        var y =0;
        for(let i = 0; i< game_row ;i ++){
            for (let j = 0; j< game_col;j++){
                if (this.game.arr[i][j] == value_Empty){
                    let diemTanCong = this.diemTC_duyetDoc(i,j) + this.diemTC_duyetNgang(i,j) + this.diemTC_duyetCheoTrai(i,j) + this.diemTC_duyetCheoPhai(i,j);
                    let diemPhongThu = this.diemPT_duyetDoc(i,j) + this.diemPT_duyetNgang(i,j) + this.diemPT_duyetCheoTrai(i,j) + this.diemPT_duyetCheoPhai(i,j);
                    let diemTam = diemTanCong > diemPhongThu?diemTanCong:diemPhongThu;
                    if (diemMax < diemTam){
                        diemMax = diemTam;
                        x = i;
                        y = j;
                    }
                }
            }
        }
        this.game.arr[x][y] = this.valueMay;
        this.game.luot++;
        this.game.valueOBanCo();
        this.game.checkWinGame(x,y);
    }

    // tạo ra biên gh nếu row + dem +1 == gioihan thi nó sẽ gh ++;
    // tao ra biến demTong = 0 r sau khi gh = 2 || dich =1 va dem =1  mà demTong < 5  no return 0;


    // diemTC
    diemTC_duyetDoc(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if (row +1 == game_row){
            soQuanDich++;
        }
        else{
            for (let dem =1; dem < 5 && row + dem< game_row; dem++){
                if (this.game.arr[row + dem][col] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row + dem][col] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if (row + dem +1 == game_row && dem!=4){
                    soQuanDich++;
                    break;
                }
            }
        }
        
        if (row - 1 < 0){
            soQuanDich++;
        }
        else{
            for (let dem =1; dem < 5 && row - dem >= 0; dem++){
                if (this.game.arr[row - dem][col] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row - dem][col] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if( row - dem -1 < 0 && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        if (soQuanDich == 2){
                return 0;
        }
       
        diemTong -= this.arrDiemPhongNgu[soQuanDich];
        diemTong += this.arrDiemTanCong[soQuanTa];
        return diemTong;
    }

    diemTC_duyetNgang(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if(col +1 == game_col){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col; dem++){
                if (this.game.arr[row][col + dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if(col + dem +1 == game_col && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        if(col  -1 < 0){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0; dem++){
                if (this.game.arr[row ][col - dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if(col - dem -1 < 0 && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        
        if (soQuanDich == 2){
            
                return 0;
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa];
        return diemTong;
    }

    diemTC_duyetCheoTrai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if((col  +1 == game_col || row +1 == game_row)){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col && row + dem < game_row; dem++){
                if (this.game.arr[row + dem][col + dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row + dem][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if((col + dem +1 == game_col || row + dem +1 == game_row) && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        if((col -1 < 0 || row -1 < 0) ){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0 && row - dem >=0; dem++){
                if (this.game.arr[row - dem][col - dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row - dem][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if((col - dem -1 < 0 || row - dem -1 < 0) && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        
        if (soQuanDich == 2){
            
                return 0;
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa];
        return diemTong;
    }

    diemTC_duyetCheoPhai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if((col +1 == game_col || row -1 <0)){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col && row - dem >=0; dem++){
                if (this.game.arr[row - dem][col + dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row - dem][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if((col + dem +1 == game_col || row - dem -1 <0) && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        if((col -1 < 0 || row +1 == game_row)){
            soQuanDich ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0 && row + dem < game_row; dem++){
                if (this.game.arr[row + dem][col - dem] == this.valueMay){
                    soQuanTa ++;
                }
                else if (this.game.arr[row + dem][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    break;
                }
                else{
                    break;
                }
                if((col - dem -1 < 0 || row + dem+1 == game_row) && dem !=4){
                    soQuanDich ++;
                    break;
                }
            }
        }
        
        if (soQuanDich == 2){
            
                return 0;
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa];
        return diemTong;
    }




    // diem PT
    diemPT_duyetDoc(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if (row +1 == game_row){
            soQuanTa++;
        }
        else{
            for (let dem =1; dem < 5 && row + dem< game_row; dem++){
                if (this.game.arr[row + dem][col] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row + dem][col] == this.game.valueNguoi){
                    soQuanDich ++;
                }
                else{
                    break;
                }
                if (row + dem +1 == game_row && dem!=4){
                    soQuanTa++;
                    break;
                }
            }
        }
        if (row - 1 < 0){
            soQuanTa++;
        }
        else{
            for (let dem =1; dem < 5 && row - dem >= 0; dem++){
                if (this.game.arr[row - dem][col] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row - dem][col] == this.game.valueNguoi){
                    soQuanDich ++;
                }
                else{
                    break;
                }
                if( row - dem -1 < 0 && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        
        if (soQuanTa == 2){
            return 0;
        }
        diemTong += this.arrDiemPhongNgu[soQuanDich];
        if (soQuanTa == 1)
            diemTong -= 1;
        return diemTong;
    }

    diemPT_duyetNgang(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if(col +1 == game_col){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col; dem++){
                if (this.game.arr[row][col + dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                }
                else{
                    break;
                }
                if(col + dem +1 == game_col && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        if(col  -1 < 0){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0; dem++){
                if (this.game.arr[row ][col - dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                }
                else{
                    break;
                }
                if(col - dem -1 < 0 && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        
        if (soQuanTa == 2){
            return 0;
        }
        diemTong += this.arrDiemPhongNgu[soQuanDich];
        if (soQuanTa == 1)
            diemTong -= 1;
        return diemTong;
    }

    diemPT_duyetCheoTrai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if((col  +1 == game_col || row +1 == game_row)){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col && row + dem < game_row; dem++){
                if (this.game.arr[row + dem][col + dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row + dem][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                }
                else{
                    break;
                }
                if((col + dem +1 == game_col || row + dem +1 == game_row) && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        if((col -1 < 0 || row -1 < 0) ){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0 && row - dem >=0; dem++){
                if (this.game.arr[row - dem][col - dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row - dem][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    
                }
                else{
                    break;
                }
                if((col - dem -1 < 0 || row - dem -1 < 0) && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        
        if (soQuanTa == 2){
            return 0;
        }
        diemTong += this.arrDiemPhongNgu[soQuanDich];
        if (soQuanTa == 1)
            diemTong -= 1;
        return diemTong;
    }

    diemPT_duyetCheoPhai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        if((col +1 == game_col || row -1 <0)){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col + dem< game_col && row - dem >=0; dem++){
                if (this.game.arr[row - dem][col + dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row - dem][col + dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    
                }
                else{
                    break;
                }
                if((col + dem +1 == game_col || row - dem -1 <0) && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        if((col -1 < 0 || row +1 == game_row)){
            soQuanTa ++;
        }
        else{
            for (let dem =1; dem < 5 && col - dem >= 0 && row + dem < game_row; dem++){
                if (this.game.arr[row + dem][col - dem] == this.valueMay){
                    soQuanTa ++;
                    break;
                }
                else if (this.game.arr[row + dem][col - dem] == this.game.valueNguoi){
                    soQuanDich ++;
                    
                }
                else{
                    break;
                }
                if((col - dem -1 < 0 || row + dem+1 == game_row) && dem !=4){
                    soQuanTa ++;
                    break;
                }
            }
        }
        if (soQuanTa == 2){
            return 0;
        }
        diemTong += this.arrDiemPhongNgu[soQuanDich];
        if (soQuanTa == 1)
            diemTong -= 1;
        return diemTong;
    }
}