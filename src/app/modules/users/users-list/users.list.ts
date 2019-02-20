import { Component, OnInit, Input } from '@angular/core'
import { UsersService } from '../users.service'
import { ModalController } from '@ionic/angular'
import { UserNew } from '../user-new/user.new'
import { Observable } from 'rxjs'
import * as moment from 'moment'


@Component({
  selector: 'app-users-list',
  templateUrl: './users.list.html',
  styleUrls: ['./users.list.scss'],
})
export class UsersList implements OnInit {
  @Input("modalSelect") modalSelect
  users: any

  constructor(
    private usersService: UsersService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.list()
  }

  public list() {
    this.users = this.usersService.list()
  }

  search(event:any){
    let value = event.target.value
    if (value) {
      this.users = this.usersService.search(value)
    } else {
      this.list()
    }
  }

  async userNew() {
    const modal = await this.modalController.create({
      component: UserNew
    })
    return await modal.present()
  }

  dismiss() {
    this.modalController.dismiss()
  }

  doRefresh(event) {
    this.list()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  last(created){
    return moment.unix(created).fromNow()
  }

  displayIcon() {
    return window.innerWidth > 768
  }

}
