import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(
    private platform:Platform
  ) {}
  ngOnInit() {
    this.platform.backButton.observers.pop();
  }
}
