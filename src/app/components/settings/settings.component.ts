import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute , Params} from '@angular/router';

import {FlashMessagesService} from 'angular2-flash-messages';

import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
settings: Settings;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
   private flashMessage: FlashMessagesService ,
   private settingsservice: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsservice.getSettings();
    console.log(this.settings);
  }
onSubmit() {
  this.settingsservice.changeSettings(this.settings);
  this.flashMessage.show('settings saved',{
    cssClass: 'alert-success' , timeout:   4000
  });
}
}
