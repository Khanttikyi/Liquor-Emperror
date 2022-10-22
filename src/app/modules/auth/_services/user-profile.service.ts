import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  showChatIcon = new Subject()
  isLoggedIn: boolean = false;
  isOnline: Boolean = false;
  userInfo: any = {}
  talkEmp: any = {}
  token: string;
  userId: string;
  otp: any;
  changeUserId = new Subject()
  constructor() {
  }


 

  setUserId(id: string) {
    this.userInfo['userId'] = id
    return true
  }

  async logOut() {
    this.isLoggedIn = false
    this.userId = ""
    this.token = ""
    this.userInfo = {}
  }



}
