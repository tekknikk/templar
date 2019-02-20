import { Component, OnInit, Input } from '@angular/core'
import { UsersService } from '../users.service'
import { ModalController, LoadingController } from '@ionic/angular'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AmplifyService }  from 'aws-amplify-angular'
import { UserConfirm } from '../user-confirm/user.confirm'
import { Router } from '@angular/router'


export class UserDetails {
    name: string
    profession: string
    dob: Date
    phone: string
    email: string
    password: string
}


@Component({
  selector: 'app-user-signin',
  templateUrl: './user.signup.html',
  styleUrls: ['./user.signup.scss']
})
export class UserSignUp implements OnInit {
  error: any;
  message: any
  EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  signUpForm = new FormGroup({
    phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9+ ]*'), Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAILPATTERN)])
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

  signUp() {
    console.warn('sign up form: ', this.signUpForm.value)
    this.presentLoading()

    this.error = null
    let user = {
      username: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      attributes: {
        'email': this.signUpForm.value.email,
        'phone_number': this.signUpForm.value.phone_number,
        'name': this.signUpForm.value.name,
        'custom:user_status': 'UserSignUp'
      }
    }
    this.amplifyService.auth().signUp(user)
      .then(() => {
        console.log('signed up calling confirm')
        this.dismiss()
        this.confirmModal(user)
      })
      .catch(err => {
        if (err.message) {
          this.error = err.message
        } else {
          this.error = err
        }
       })
  }

}
