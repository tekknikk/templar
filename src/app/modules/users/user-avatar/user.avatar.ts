import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { UsersService } from '../users.service'
import { AmplifyService }  from 'aws-amplify-angular';
import { LoadingController } from '@ionic/angular'
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding} from '@capacitor/core';

const { Camera } = Plugins

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user.avatar.html',
  styleUrls: ['./user.avatar.scss']
})

export class UserAvatar implements OnInit {
  @Input('user') user
  avatarUrl: Observable<string>

  constructor(
    private usersService: UsersService,
    private loadingController: LoadingController,
    private amplifyService: AmplifyService
  ) {
    this.amplifyService = amplifyService
  }

  ngOnInit() {
     // this.avatarUrl = this.getAvatarUrl()
  }

  getAvatarUrl() {
    const url:any = this.amplifyService.storage().get(this.user.avatar, {
      level: 'public',
    })
    return url
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    return await loading.present();
  }

  async takePicture(user) {
    const avatar = await Camera.getPhoto({
      quality: 90,
      width: 500,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Base64
    })
    const filename = 'avatars/'+user._id+'-'+Date.now()+'.jpg'
    const filedata = new Buffer(avatar.base64Data.slice(23),'base64');

    this.presentLoading()
    this.amplifyService.storage().put(
      filename,
      filedata,
      {
        level: 'public',
        contentType: 'image/jpeg',
        contentEncoding: 'base64'
      }
    )
    .then(result => {
      let update = {
        avatar: filename
      }
      this.usersService.update(user._id, update)
        .subscribe(update => {
        })
    })
    .catch(err => {
      console.log('storage error: ', err)
    })
  }

}
