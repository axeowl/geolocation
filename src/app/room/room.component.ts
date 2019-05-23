import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef;
  private _CANVAS: any;
  private _CONTEXT: any;
  constructor() { }

  ngOnInit() {
    this._CANVAS 	    = this.canvasEl.nativeElement;

    this.initialiseCanvas();
    this.drawSquare(150, 150);
  }
  initialiseCanvas() {
    if ( this._CANVAS.getContext) {
      this.setupCanvas(150, 150, 'living room');
    }
  }
  setupCanvas(width, height, roomName) {
    this._CONTEXT = this._CANVAS.getContext('2d');
    // this._CONTEXT.fillStyle = '#FFFFFF';
    this._CANVAS.width  	= width;
    this._CANVAS.height 	= height;
    this._CONTEXT.fillText(roomName, 75 - 2 * (roomName.toString().length), 75);
    this._CONTEXT.fill();
  }
  clearCanvas() {
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this.setupCanvas(150, 150, 'living room');
  }
  drawSquare(width, height) {
    this.clearCanvas();
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(0, 0, width, height);
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#000000';
    this._CONTEXT.stroke();
  }
}
