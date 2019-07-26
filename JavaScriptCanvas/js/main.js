(function() {
  'use strict';

  let t = 0;


  function draw() {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefind') {
      return;
    }
    const ctx = canvas.getContext('2d');



    // 四角 {
        ctx.fillRect(50, 50, 50, 50); // 黒い四角(x, y, width, height)
        ctx.strokeRect(50, 50, 50, 50) // 枠のみ;
        ctx.fillStyle = 'pink';
        ctx.strokeStyle = 'red'; //color
        ctx.lineWidth = 8; //border
        ctx.lineJoin = 'round'; //丸
        ctx.lineJoin = 'bevel'; //斜面
      }


    //   線形グラデーション {
        const g = ctx.createLinearGradient(0, 0, canvas.width, 0); //(x0, y0, x1, y1)
        g.addColorStop(0, '#f00');
        g.addColorStop(0.5, '#0f0');
        g.addColorStop(1, '#00f');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }


    //   円形グラデーション {
        const g = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 50, //x0, y0, r0,
          canvas.width / 2, canvas.height / 2, 500 //x1, y1, r1
        );
        g.addColorStop(0.5, '#0f0');
        g.addColorStop(1, '#00f');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }


    // 影 {
       ctx.fillRect(50, 50, 50, 50);
       ctx.shadowOffsetX = 4; //ずれ
       ctx.shadowOffsetY = 4; //ずれ
       ctx.shadowBlur = 4; //ぼかし度
       ctx.shadowColor = 'rgba(0, 0 ,0, 0.3)';
    }


    // 線 {
      ctx.beginPath(); //始まり
      ctx.moveTo(50, 50);
      ctx.lineTo(100, 50);
      ctx.lineTo(100, 100);
      ctx.closePath(); //終わり
      ctx.stroke();
      ctx.fill(); //塗りつぶし
    }


    // 線のスタイル {
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(200, 50);
      ctx.setLineDash(5, 10); // (線, 空間)
      ctx.lineWidth = 16;
      ctx.lineCap = 'round' //終端
      ctx.stroke();
        }


    // 円弧 {
      ctx.beginPath(); //始まり
      ctx.arc(100, 100, 50, 0, 2 * Math.PI ,true); //(x, y, r, 始点の角度, 終点の角度)
      ctx.arc(100, 100, 50, 0, 300 / 360 * 2 * Math.PI ,true); //(x, y, r, 始点の角度, 終点の角度, 時計回り反時計回り)
      moveTo();
      ctx.stroke();
      ctx.fill();
    }


    // 楕円 {
      ctx.beginPath();
      ctx.eliipse(100, 100, 50, 50, 0, 0, 2 * Math.PI); //(x, y, rx, ry, 回転角, そして始点の角度, 終点の角度);
      ctx.stroke();

      ctx.rect(50, 50, 50, 50); //四角
      ctx.stroke();
    }


    // テキスト描画 {
      ctx.beginPath();
      ctx.moveTo(0, 100);
      ctx.lineTo(canvas.width, 100);
      ctx.moveTo(100, 0);
      ctx.lineTo(100, canvas.height);
      ctx.stroke();

      ctx.font = 'bold 64px Verdana';
      ctx.textAlign = 'right';
      ctx.textBaseLine = 'top'

      ctx.fillText('tokyo', 100, 100, 100); //テキスト
      ctx.strokeText('Tokyo', 100, 100, 100); //テキスト
    }


    // 画像 {
      const img = document.createElement('img');
      img.src = 'img/logo.png';

      img.addEventListener('load', () => { //読み読み
        ctx.drawImage(img, 0, 0, 40 //幅, 40 //高さ); //描画
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      });


    // 画像切り抜き
      const img = document.createElement('img');
      img.src = 'img/sprite.png';

      img.addEventListener('load', () => {
        ctx.drawImage(
          img,
          sx, sy, sw, sh, //切り出し元の画像 x, y 座標, 幅, 高さ
          dx, dy, dw, dh //切り出した画像を描画する先 x, y 座標, 幅, 高さ
        )
      });

    // 顔
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, 200, 200);

    ctx.beginPath();
    ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80, 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.ellipse(120, 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    ctx.save();

    ctx.scale(0.5, 0.5);
    ctx.translate(400, 0);
    ctx.rotate(45 / 180 * Math.PI);

    ctx.fillStyle = 'olive';
    ctx.fillRect(0, 0, 200, 200);

    ctx.beginPath();
    ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80, 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.ellipse(120, 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = 'black';
    ctx.fillRect(80, 120, 40, 40);


    //アニメーション
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();


    ctx.beginPath();
    ctx.ellipse(80 + Math.sin(t / 30), 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.ellipse(120 + Math.sin(t /30), 100, 8, 8, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'skyblue';
    ctx.fill();

    t++;
    setTimeout(draw, 10);
    }



  draw();
})();
