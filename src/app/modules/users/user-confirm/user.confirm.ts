import { Component, OnInit, Input } from '@angular/core'
import { ModalController, LoadingController } from '@ionic/angular'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AmplifyService }  from 'aws-amplify-angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user.confirm.html',
  styleUrls: ['./user.confirm.scss']
})

export class UserConfirm implements OnInit {
  @Input('user') user
  error: any
  code: string
  information: any;
  confirmForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(15)])
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
    console.log('user signed up: ', this.user.username)
  }

  dismiss() {
    this.modalController.dismiss()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    return await loading.present()
  }

  confirm() {
    console.log('confirm username: '+ this.user.username)
    console.log('confirm code: '+ this.confirmForm.value.code)

    this.presentLoading()

    this.amplifyService.auth().confirmSignUp(
      this.user.username,
      this.confirmForm.value.code
    )
      .then(() => {
        this.amplifyService.auth().signIn(
          this.user.username,
          this.user.password
        )
          .then((user: any) => {
            console.log('signed in user', user)

            this.amplifyService.auth().updateUserAttributes(user, {
                'custom:user_status': 'UserConfirm',
            })
            .then(() => {
              this.dismiss()
            })
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
    this.amplifyService.auth().resendSignUp(
      this.user.username
    )
      .then(() => {
        this.information = "Code resent - check junk/spam folder"
      })
  }

}
