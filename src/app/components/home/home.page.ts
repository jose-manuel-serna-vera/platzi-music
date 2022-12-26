import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatziMusicService } from 'src/app/services/api/auth/platzi-music.service';
import { SongModalPage } from '../song-modal/song-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  urlSong = "";
  artists = [];
  songs = [];
  song: any = {};
  albums = [];
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  currentSong: any = {};
  newTime;
  constructor(
    private musicServices: PlatziMusicService,
    private modalController: ModalController
  ) {

  }
  ionViewDidEnter() {
    this.musicServices.getNewReleases().then(newReleases => {
      this.artists = this.musicServices.getArtists().items;
      this.songs = newReleases.albums.items.filter(e => e.album_type == "single");
      this.albums = newReleases.albums.items.filter(e => e.album_type == "album");
    }).catch(error => {
      console.log(error);
    });
  }


  async showSongs(artist) {
    const songs = await this.musicServices.getArtistsTopTracks(artist.id);

    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });

    return await modal.present();
  }

  async showAlbums(album) {
    const songs = await this.musicServices.getAlbumTracks(album.id);

    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: {
        songs: songs.items,
        artist: album.name
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });

    return await modal.present();
  }

  play() {
    // stopanterior
    if (this.urlSong != "") {
      this.currentSong.setAttribute('src', this.urlSong); //change the source
      this.currentSong.load();
      this.currentSong.pause();
    }
    this.currentSong = new Audio();
    this.currentSong.setAttribute('src', this.song.preview_url); //change the source
    this.currentSong.load();
    this.currentSong.play();
    this.urlSong = this.song.preview_url;

    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
      if (this.newTime == 1) {
        this.song.playing = false;
      }
    })

    this.song.playing = true;
  } 

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = "0:00") {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();

      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }

      let seconds = (partTime % 60).toString();

      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }

      return minutes + ":" + seconds;
    }
  }

}
