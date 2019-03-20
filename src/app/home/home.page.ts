import { Component, ChangeDetectorRef} from '@angular/core';
import {NavController, Platform, Events} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  beaconData: any;
  constructor(private platform: Platform, private change: ChangeDetectorRef) {
  }
  startScanningForBeacons() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beaconData = data;
        console.log(this.beaconData);
        setTimeout(() => {
          this.change.detectChanges();
        }, 1000);
      }, error => console.error(error));
    });
  }
}
