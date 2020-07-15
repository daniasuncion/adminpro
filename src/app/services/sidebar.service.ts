import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

	public menu : any[] = [
			{
				titulo: 'Dashboard',
				icono: 'mdi mdi-gauge',
				submenu: [
					{
						titulo: 'Main',
						url: '/',
					},
					{
						titulo: 'ProgressBar',
						url: '/dashboard/progress',
					},
					{
						titulo: 'Graficas',
						url: '/dashboard/graficas1',
					},
				]

			}
		];

  constructor() { }
}
