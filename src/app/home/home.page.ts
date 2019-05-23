import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {NavController, Platform, Events} from '@ionic/angular';
import * as Graph from 'graph-data-structure';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
declare var require: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Graph = require('graph-data-structure');
  graph = Graph();
  beaconData: any;
  // beacons: Array<String> = [];
  beacons: Map<String, String> = new Map();
  beaconsLength: number;
  distance: any = Number.MAX_SAFE_INTEGER;
  youAreHere = 'first';
  valuableBeacons: any = [];
  shortestPath: Array<any> = [];
  position: number;
  nextHop: string = this.shortestPath[0];
  constructor(private platform: Platform, private change: ChangeDetectorRef, private tts: TextToSpeech) {
    this.tts.speak({
      text: 'Vai nella stanza 5',
      locale: 'it-IT',
      rate: 1.0
    })
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
    this.testGraph();
  }
  ngOnInit() {
    // this.beacons['E2:73:48:00:BB:44'] = 'first';
    // this.beacons['C0:BA:A3:E1:72:9D'] = 'second';
    // this.beacons['DC:A9:5D:BB:BD:88'] = 'third';
    // this.beaconsLength = 3;
    this.beacons.set('E2:73:48:00:BB:44', 'first');
    this.beacons.set('C0:BA:A3:E1:72:9D', 'second');
    this.beacons.set('DC:A9:5D:BB:BD:88', 'third');
  }
  startScanningForBeacons() {
    this.position = 0;
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beaconData = data;
        if (this.beacons.get[this.beaconData.address]) {
          const index = this.valuableBeacons.indexOf(this.beaconData);
          if (index !== -1) {
            this.valuableBeacons.splice(index, 1);
          }
          this.valuableBeacons.push(this.beaconData);
        }
        this.youAreHere = this.calculateDistance(this.valuableBeacons)[0];
        if (this.youAreHere === this.shortestPath[3]) {
          console.log('TADAAAAAAAAAAAAAAAA');
          this.stopScan();
          return;
        }
        this.distance = Math.round(this.calculateDistance(this.valuableBeacons)[1]);
        if (this.distance < 2) {
          console.log('Welcome into room' + this.youAreHere);
          this.nextHop = this.shortestPath[this.shortestPath.indexOf(this.youAreHere) + 1];
        }
        setTimeout(() => {
          this.change.detectChanges();
        }, 1000);
      }, error => console.error(error));
    });
  }
  stopScan() {
    console.log('stop');
    this.valuableBeacons = [];
    evothings.eddystone.stopScan();
  }
  calculateDistance (s_beacons: any) {
    let tempDist = Number.MAX_SAFE_INTEGER;
    let what;
    for (let i = 0; i < s_beacons.length; i++) {
        const beacon_dist = evothings.eddystone.calculateAccuracy(s_beacons[i].txPower, s_beacons[i].rssi);
      if (this.beacons.get[s_beacons[i].address] && beacon_dist < tempDist) {
        tempDist = beacon_dist;
        what = this.beacons.get[s_beacons[i].address];
      }
    }
    const returnVar = [what, tempDist];
    return returnVar;
  }
  include(arr, obj) {
    return arr.indexOf(obj);
  }
  testGraph() {
    this.graph.addNode('first');
    this.graph.addNode('second');
    this.graph.addNode('third');
    this.graph.addEdge('first', 'second', 50);
    this.graph.addEdge('second', 'first', 50);
    this.graph.addEdge('second', 'third', 70);
    this.graph.addEdge('third', 'second', 70);
    this.graph.addEdge('first', 'third', 150);
    this.graph.addEdge('third', 'first', 150);
    this.shortestPath = this.graph.shortestPath('first', 'third');
    console.log(this.shortestPath);
  }
}
