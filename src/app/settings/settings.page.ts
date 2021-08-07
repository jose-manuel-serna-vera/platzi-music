import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userImages = "assets/img/logo.jpg";
  photo: SafeResourceUrl;

  constructor(private sanitize: DomSanitizer) {

  }



  ngOnInit() {
  }

  async takeFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.photo = this.sanitize.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    )
    // this.userImages = image.dataUrl

    console.log(image);

  }

}
