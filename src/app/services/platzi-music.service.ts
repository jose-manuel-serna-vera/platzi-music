import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {
  apiUrl = "https://platzi-music-api.herokuapp.com/";
  constructor() { }

  getArtists() {

    return dataArtists;
  }


  getNewReleases() {
    return fetch("https://platzi-music-api.herokuapp.com/browse/new-releases").then(res => res.json()).catch();
  }

  getArtistsTopTracks(artistId) {
    return fetch(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`).then(res => res.json()).catch();
  }

  getAlbumTracks(albumId) {
    return fetch(
      `https://platzi-music-api.herokuapp.com/albums/${albumId}/tracks?country=CO`
    ).then(response => response.json());
  }
}


