import { Component, OnInit, Input } from '@angular/core'
import { UsersService } from '../users.service'
import { ModalController, LoadingController } from '@ionic/angular'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AmplifyService }  from 'aws-amplify-angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-reset',
  templateUrl: './user.reset.html',
  styleUrls: ['./user.reset.scss']
})

export class UserReset {
  @Input('username') username
  error: any
  confirmForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router,
    private amplifyService: AmplifyService
  ) {
    this.amplifyService = amplifyService
  }

  ngOnInit() {}

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

  confirm() {
    this.presentLoading()
    this.amplifyService.auth().forgotPasswordSubmit(
      this.username,
      this.confirmForm.value.code,
      this.confirmForm.value.password
    )
      .then(() => {
        this.amplifyService.auth().signIn(
          this.username,
          this.confirmForm.value.password
        )
          .then((user:any) => {
            console.log('signed in user', user)
            this.dismiss()
            this.router.navigate(['/users-home'])
          })
      })
      .catch(err => {
        if (err.message) {
          this.error = err.message
        } else {
          this.error = err
        }
       })
  }

  resendCode() {
    this.amplifyService.auth().resendSignUp(this.username)
      .then(() => {
        this.error = "Check you inbox, a code has been emailed to you."
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
