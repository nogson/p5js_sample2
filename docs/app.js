var diamonds = [];
var diamondW = 20;
var diamondH = 30;

var colors = ['#3C110E', '#EEECCF', '#FFD503', '#FC7149', '#F41B36'];

var colorLenght = 5;
var row = null;
var col = null;

//初期化関数
function setup() {
    frameRate(10);

    //canvas
    createCanvas(window.windowWidth, window.windowHeight);

    //縦のインスタンス数（行）
    row = Math.ceil(height / (diamondH * 2)) + 10;
    //横のインスタンス数（列）
    col = Math.ceil(width / diamondW);


    //縦に並ぶインスタンス
    _.each(_.range(row), function(v, rIndex) {
        //色のインデックス番号
        var colorIndex = rIndex % colorLenght;
        //色のインデックス番号を格納
        var indexArr = [];

        //横にならぶインスタンス
        _.each(_.range(col), function(v, cIndex) {

            var color = null;
            var selectedColorIndex = null;

            //色数（５色）を１グループとして区切る。
            //1グループ毎に色を反転させる
            if (Math.floor(cIndex / colorLenght) % 2 === 0) {
                if (cIndex % colorLenght === 0) {
                    indexArr = [];
                }
                //色のインデックス番号
                selectedColorIndex = (colorIndex + cIndex % colorLenght) % colorLenght;
                //色を反転する為に配列に格納
                indexArr.push(selectedColorIndex);
            } else {
                //１グループに１回だけ配列を反転する
                if (cIndex % colorLenght === 0) {
                    indexArr.reverse();
                }
                //色のインデックス番号
                selectedColorIndex = indexArr[cIndex % 5]
            }

            //シェイプクラスを配列に追加
            diamonds.push(new Diamond(cIndex, rIndex, selectedColorIndex));

        });

    });
}


//canvasに描画　毎フレーム実行される
function draw() {
    //背景を塗りつぶし
    background(255); //再描画

    //描画
    _.each(diamonds, function(diamond) {
        diamond.drow();
    });

}

function Diamond(colIndex, rowIndex, colorIndex) {
    var baseY = null;

    //色切り替えように使用
    var count = 0;
    var colorsSetIndex = 0;

    //colorsの中から選択された色のインデックス番号
    this.colorIndex = colorIndex;
    //横位置のインデックス番号
    this.colIndex = colIndex;
    //縦位置のインデックス番号
    this.rowIndex = rowIndex;

    //左上がり、右上がりの形状のシェイプの判別
    this.shapeType = Math.floor(colIndex / 5) % 2 ? 0 : 1;

    this.x1 = colIndex * diamondW;
    this.x2 = colIndex * diamondW + diamondW;

    if (this.shapeType === 0) {
        //右上がり
        baseY = rowIndex * (diamondH * 2) + diamondH * (4 - (colIndex % 5)) - 200;
        this.y1 = baseY + diamondH;
        this.y2 = baseY;
        this.y3 = baseY + diamondH * 2;
        this.y4 = baseY + diamondH * 3;
    } else {
        //左上がり
        baseY = rowIndex * (diamondH * 2) + diamondH * (colIndex % 5) - 200;
        this.y1 = baseY
        this.y2 = baseY + diamondH;
        this.y3 = baseY + diamondH * 3;
        this.y4 = baseY + diamondH * 2;
    }

    this.drow = function() {

        noStroke();
        var color = colors[this.colorIndex];

        fill(color);

        beginShape();
        vertex(this.x1, this.y1);
        vertex(this.x2, this.y2);
        vertex(this.x2, this.y3);
        vertex(this.x1, this.y4);
        endShape(CLOSE);

        //色セットの中から色を入れ替えていく
        if (colorLenght - 1 > this.colorIndex) {
            this.colorIndex++;
        } else {
            this.colorIndex = 0;

        }
    }
}
