import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private gpsX:String = '?';
  private gpsY:String = '?';

  constructor(public navCtrl: NavController, private device: Device, private geolocation: Geolocation) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if(data && data.coords) {
        this.gpsX = data.coords.latitude.toFixed(4);
        this.gpsY = data.coords.longitude.toFixed(4);
      }
    });
  }

}
