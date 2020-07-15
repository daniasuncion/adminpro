import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


	constructor( public settingsService : SettingsService) { }

  ngOnInit(): void {
		this.settingsService.aplicarCheck();
  }


	cambiarColor(tema : string ){
		this.settingsService.cambiarColor(tema);
	}


}
