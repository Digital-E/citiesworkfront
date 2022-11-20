import { useEffect, useState } from "react"
import styled from "styled-components"

// import { fabric } from "fabric";

import Selector from './selector';

let fabric = null;


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 1800px;
    z-index: 0;

    #drawing-color {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
`

let canvas = null;

export default ({ data, preview }) => {
  let [brushIndex, setBrushIndex] = useState(0);

  let colors = [
    {
      color: '#EA3333',
      width: 10,
    },
    {
      color: '#0100F5',
      width: 30,
    },
    {
      color: '#FFFF54',
      width: 40,
    },
    {
      color: '#4EAA84',
      width: 10,
    },
    {
      color: '#837652',
      width: 5
    }
  ]


  useEffect(() => {
      if(!preview) {
        fabric = require('fabric').fabric
      } else {
        return null
      }

      (function() {
          var $ = function(id){return document.getElementById(id)};
        
          // var canvas = this.__canvas = new fabric.Canvas('c', {
          //   isDrawingMode: true
          // });

          // Set Height and Width
          $('c').setAttribute('width', window.innerWidth);
          $('c').setAttribute('height', window.innerHeight);

          canvas = new fabric.Canvas('c', {
              isDrawingMode: true
            });
        
          fabric.Object.prototype.transparentCorners = false;


          if(window.innerWidth > 990) {
            canvas.on('mouse:move', function (event) {
              this._onMouseDownInDrawingMode(event);
          });
          }


        
          var drawingModeEl = $('drawing-mode'),
              drawingOptionsEl = $('drawing-mode-options'),
              drawingColorEl = $('drawing-color'),
              drawingShadowColorEl = $('drawing-shadow-color'),
              drawingLineWidthEl = $('drawing-line-width'),
              drawingShadowWidth = $('drawing-shadow-width'),
              drawingShadowOffset = $('drawing-shadow-offset'),
              clearEl = $('clear-canvas');
        
          // clearEl.onclick = function() { canvas.clear() };
        
          // drawingModeEl.onclick = function() {
          //   canvas.isDrawingMode = !canvas.isDrawingMode;
          //   if (canvas.isDrawingMode) {
          //     drawingModeEl.innerHTML = 'Cancel drawing mode';
          //     drawingOptionsEl.style.display = '';
          //   }
          //   else {
          //     drawingModeEl.innerHTML = 'Enter drawing mode';
          //     drawingOptionsEl.style.display = 'none';
          //   }
          // };
        
          if (fabric.PatternBrush) {
            var vLinePatternBrush = new fabric.PatternBrush(canvas);
            vLinePatternBrush.getPatternSrc = function() {
        
              var patternCanvas = fabric.document.createElement('canvas');
              patternCanvas.width = patternCanvas.height = 10;
              var ctx = patternCanvas.getContext('2d');
        
              ctx.strokeStyle = this.color;
              ctx.lineWidth = 5;
              ctx.beginPath();
              ctx.moveTo(0, 5);
              ctx.lineTo(10, 5);
              ctx.closePath();
              ctx.stroke();
        
              return patternCanvas;
            };
        
            var hLinePatternBrush = new fabric.PatternBrush(canvas);
            hLinePatternBrush.getPatternSrc = function() {
        
              var patternCanvas = fabric.document.createElement('canvas');
              patternCanvas.width = patternCanvas.height = 10;
              var ctx = patternCanvas.getContext('2d');
        
              ctx.strokeStyle = this.color;
              ctx.lineWidth = 5;
              ctx.beginPath();
              ctx.moveTo(5, 0);
              ctx.lineTo(5, 10);
              ctx.closePath();
              ctx.stroke();
        
              return patternCanvas;
            };
        
            var squarePatternBrush = new fabric.PatternBrush(canvas);
            squarePatternBrush.getPatternSrc = function() {
        
              var squareWidth = 10, squareDistance = 2;
        
              var patternCanvas = fabric.document.createElement('canvas');
              patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
              var ctx = patternCanvas.getContext('2d');
        
              ctx.fillStyle = this.color;
              ctx.fillRect(0, 0, squareWidth, squareWidth);
        
              return patternCanvas;
            };
        
            var diamondPatternBrush = new fabric.PatternBrush(canvas);
            diamondPatternBrush.getPatternSrc = function() {
        
              var squareWidth = 10, squareDistance = 5;
              var patternCanvas = fabric.document.createElement('canvas');
              var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
              });
        
              var canvasWidth = rect.getBoundingRect().width;
        
              patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
              rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
        
              var ctx = patternCanvas.getContext('2d');
              rect.render(ctx);
        
              return patternCanvas;
            };
        
            var img = new Image();
            img.src = '../../public/images/cal.png';
        
            var texturePatternBrush = new fabric.PatternBrush(canvas);
            texturePatternBrush.source = img;
          }
        
          // $('drawing-mode-selector').onchange = function() {
        
          //   if (this.value === 'hline') {
          //     canvas.freeDrawingBrush = vLinePatternBrush;
          //   }
          //   else if (this.value === 'vline') {
          //     canvas.freeDrawingBrush = hLinePatternBrush;
          //   }
          //   else if (this.value === 'square') {
          //     canvas.freeDrawingBrush = squarePatternBrush;
          //   }
          //   else if (this.value === 'diamond') {
          //     canvas.freeDrawingBrush = diamondPatternBrush;
          //   }
          //   else if (this.value === 'texture') {
          //     canvas.freeDrawingBrush = texturePatternBrush;
          //   }
          //   else {
          //     canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
          //   }
        
          //   if (canvas.freeDrawingBrush) {
          //     var brush = canvas.freeDrawingBrush;
          //     brush.color = drawingColorEl.value;
          //     if (brush.getPatternSrc) {
          //       brush.source = brush.getPatternSrc.call(brush);
          //     }
          //     brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
          //     brush.shadow = new fabric.Shadow({
          //       blur: parseInt(drawingShadowWidth.value, 10) || 0,
          //       offsetX: 0,
          //       offsetY: 0,
          //       affectStroke: true,
          //       color: drawingShadowColorEl.value,
          //     });
          //   }
          // };
        
          // drawingColorEl.onchange = function() {
          //   var brush = canvas.freeDrawingBrush;
          //   brush.color = this.value;

          //   if (brush.getPatternSrc) {
          //     brush.source = brush.getPatternSrc.call(brush);
          //   }
          // };

          // drawingShadowColorEl.onchange = function() {
          //   canvas.freeDrawingBrush.shadow.color = this.value;
          // };
          // drawingLineWidthEl.onchange = function() {
          //   canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
          //   this.previousSibling.innerHTML = this.value;
          // };
          // drawingShadowWidth.onchange = function() {
          //   canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
          //   this.previousSibling.innerHTML = this.value;
          // };
          // drawingShadowOffset.onchange = function() {
          //   canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
          //   canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
          //   this.previousSibling.innerHTML = this.value;
          // };
        
          // if (canvas.freeDrawingBrush) {
          //   canvas.freeDrawingBrush.color = drawingColorEl.value;
          //   canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
          //   canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
          //   canvas.freeDrawingBrush.shadow = new fabric.Shadow({
          //     blur: parseInt(drawingShadowWidth.value, 10) || 0,
          //     offsetX: 0,
          //     offsetY: 0,
          //     affectStroke: true,
          //     color: drawingShadowColorEl.value,
          //   });
          // }
        })();
        
  }, []);

  useEffect(() => {
    if(preview) return null

    var brush = canvas.freeDrawingBrush;
    brush.color = colors[brushIndex].color;
    canvas.freeDrawingBrush.width = colors[brushIndex].width;

  }, [brushIndex])

    return (
        <Container>
            <Selector data={colors} brushIndex={brushIndex} setBrushIndex={(i) => setBrushIndex(i)} />
            <canvas id="c" width="1000" height="1000"></canvas>
        </Container>
    )
}