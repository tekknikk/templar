import { Component, OnInit } from '@angular/core'
import { UsersService } from '../users.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController, AlertController } from '@ionic/angular'

@Component({
  selector: 'app-user-new',
  templateUrl: './user.new.html',
  styleUrls: ['./user.new.scss']
})

export class UserNew implements OnInit {
  user:any
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    email: new FormControl('',[Validators.required]),
    birthdate: new FormControl('',[]),
    isAdmin: new FormControl('',[])
  })

  constructor(
    private usersService: UsersService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  onSubmit() {
    console.warn(this.userForm.value)
    this.usersService.create(this.userForm.value)
      .subscribe(user => {
        this.user = user
        this.dismiss()
        this.alertAddUser()
      })
  }

  dismiss() {
    this.modalController.dismiss()
  }

  async alertAddUser() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'New user added',
      buttons: ['OK']
    });

    await alert.present();
  }
}
