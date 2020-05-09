import { Component } from '@angular/core';
import { BlynkService } from '../services/blynk.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public blynkService: BlynkService) {}
}
