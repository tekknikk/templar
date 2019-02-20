import { Component, OnInit } from '@angular/core'
import { UsersService } from '../users.service'
import { ModalController, LoadingController } from '@ionic/angular'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AmplifyService }  from 'aws-amplify-angular';
import { Router } from '@angular/router'
import { UserConfirm } from '../user-confirm/user.confirm'
import { UserReset } from '../user-reset/user.reset'

export class LoginDetails {
  email: string;
  password: string;
}

@Component({
  selector: 'app-user-signin',
  templateUrl: './user.signin.html',
  styleUrls: ['./user.signin.scss']
})

export class UserSignIn implements OnInit {
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  error: any
  signInForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAILPATTERN)]),
  })


  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router,
    private amplifyService: AmplifyService
  ) {
    this.amplifyService = amplifyService
  }

  ngOnInit() {

  }


  dismiss() {
    this.modalController.dismiss()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    return await loading.present();
  }

  async confirmModal(user) {
    const modal = await this.modalController.create({
      component: UserConfirm,
      componentProps: { user: user },
      backdropDismiss: false
    })
    return await modal.present()
  }

  async resetModal(username) {
    const modal = await this.modalController.create({
      component: UserReset,
      componentProps: { username: username },
      backdropDismiss: false
    })
    return await modal.present()
  }


  signIn() {
    console.warn('signIn submit: ', this.signInForm.value)
    this.presentLoading()

    console.log('login..');
    let user = {
      username: this.signInForm.value.email,
      password: this.signInForm.value.password
    }

    this.amplifyService.auth().signIn(user)
      .then(result => {
        console.log('signed in result', result)
        this.dismiss()
        this.router.navigate(['/user-home']);
      })
      .catch(err => {
        if (err.message === 'User is not confirmed.') {
          this.dismiss()
          this.confirmModal(user)
        } else {
          this.error = err.message
        }
       })
  }


  forgotPassword() {
    if (this.signInForm.value.email) {
      this.presentLoading()
      this.amplifyService.auth().forgotPassword(
        this.signInForm.value.email
      )
        .then(data => {
          console.log(data)
          this.dismiss()
          this.resetModal(this.signInForm.value.email)
        })
        .catch(err => this.error = err.message)
    } else {
      this.error = "Please enter your email"
    }
  }

}
