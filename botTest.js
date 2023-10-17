class botTest{
    constructor(game){
        this.game = game;
        this.i =0;
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


    // diemTC
    diemTC_duyetDoc(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        var soOTrong =0;
        var quanKeBen =0;
        for (let dem =1; dem < 5 && row + dem< game_row; dem++){
            if (this.game.arr[row + dem][col] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row + dem][col] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        for (let dem =1; dem < 5 && row - dem >= 0; dem++){
            if (this.game.arr[row - dem][col] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row - dem][col] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        if (soOTrong == 0 && soQuanDich==2) return 0;
        if (soOTrong + soQuanTa <4){
            // if (soQuanDich == 2){
                return 0;
            // }
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich];
        diemTong += this.arrDiemTanCong[soQuanTa] + 0.25*quanKeBen;
        return diemTong;
    }

    diemTC_duyetNgang(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        var soOTrong =0;
        var quanKeBen =0;
        for (let dem =1; dem < 5 && col + dem< game_col; dem++){
            if (this.game.arr[row][col + dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row][col + dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        for (let dem =1; dem < 5 && col - dem >= 0; dem++){
            if (this.game.arr[row ][col - dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row][col - dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        if (soOTrong + soQuanTa <4){
            // if (soQuanDich == 2){
                return 0;
            // }
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa] + 0.25*quanKeBen;
        return diemTong;
    }

    diemTC_duyetCheoTrai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        var soOTrong =0;
        var quanKeBen =0;
        for (let dem =1; dem < 5 && col + dem< game_col && row + dem < game_row; dem++){
            if (this.game.arr[row + dem][col + dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row + dem][col + dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        for (let dem =1; dem < 5 && col - dem >= 0 && row - dem >=0; dem++){
            if (this.game.arr[row - dem][col - dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row - dem][col - dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong ++;
            }
        }
        if (soOTrong + soQuanTa <4){
            // if (soQuanDich == 2){
                return 0;
            // }
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa]+ 0.25*quanKeBen;
        return diemTong;
    }

    diemTC_duyetCheoPhai(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
        var soOTrong =0;
        var quanKeBen =0;
        for (let dem =1; dem < 5 && col + dem< game_col && row - dem >=0; dem++){
            if (this.game.arr[row - dem][col + dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row - dem][col + dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong++;
            }
        }
        for (let dem =1; dem < 5 && col - dem >= 0 && row + dem < game_row; dem++){
            if (this.game.arr[row + dem][col - dem] == this.valueMay){
                soQuanTa ++;
                if (dem == 1) quanKeBen ++;
            }
            else if (this.game.arr[row + dem][col - dem] == this.game.valueNguoi){
                soQuanDich ++;
                break;
            }
            else{
                soOTrong++;
            }
        }
        if (soOTrong + soQuanTa <4){
            // if (soQuanDich == 2){
                return 0;
            // }
        }
        diemTong -= this.arrDiemPhongNgu[soQuanDich + 1];
        diemTong += this.arrDiemTanCong[soQuanTa]+ 0.25*quanKeBen;
        return diemTong;
    }




    // diem PT
    diemPT_duyetDoc(row,col){
        var diemTong =0;
        var soQuanTa =0;
        var soQuanDich =0;
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
        }
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
        }
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
        }
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
        }
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