import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.create();
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.storage.set("isUserLoggedIn", false);
    this.router.navigate(['/login']);
  }

  goTosettings(){
    this.router.navigate(['/menu/settings']);
    this.menu.close();

  }
  goToHome(){
    this.router.navigate(['/menu/home']);
    this.menu.close();

  }
  goToSports(){
    this.router.navigate(['/menu/sports']);
    this.menu.close();

  }

}
