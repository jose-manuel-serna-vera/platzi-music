import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      title: "Escucha Tu musica",
      subtitle: "en cualquier lugar",
      description: "asdasasdasdasdasddad asdasd asdasdas asdasdas",
      icon: "play"
    },
    {
      title: "Escucha Tu musica",
      subtitle: "en cualquier lugar",
      description: "asdasasdasdasdasddad asdasd asdasdasdas ",
      icon: "videocam"
    },
    {
      title: "Escucha Tu musica",
      subtitle: "en cualquier lugar",
      description: "asdasasdasdasdasdda asdasd asdasdasd",
      icon: "musical-notes"
    },
  ];
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.create();
  }

  finish() {
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/menu/home");
  }

}
