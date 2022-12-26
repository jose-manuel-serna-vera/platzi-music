import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.page.html',
  styleUrls: ['./song-modal.page.scss'],
})
export class SongModalPage {
  songs = [];
  artist = [];
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  // html cargado
  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    this.artist = this.navParams.data.artist;

    console.log(this.songs);
  }
  async selectSong(song = {}) {
    await this.modalController.dismiss(song);
  }
}
