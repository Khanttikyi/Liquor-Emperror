import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AlertController } from '@ionic/angular';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    userName: '',
    userPassword: '',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  public showPassword: boolean;
  public showoldPassword: boolean;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private database: DatabaseService,
    private alertCtrl: AlertController,
    private userService: UserProfileService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        this.defaultAuth.userName,
        Validators.compose([
          Validators.required,
          // Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      userPassword: [
        this.defaultAuth.userPassword,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  async submit() {
    this.hasError = false;
    // const loginSubscr = this.authService
    //   .login(this.f.userName.value, this.f.userPassword.value)
    //   .pipe(first())
    //   .subscribe((user: UserModel) => {
    //     if (user) {
    //       this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
    // this.unsubscribe.push(loginSubscr);
    this.database.checkUserExist(this.loginForm.value).then(async (res) => {
      console.log(res);
      if (res) {
        if (res.userId != null) {
          this.userService.userInfo = res
          this.database.update('LOGIN_USER', res)
          this.router.navigate(['/dashboard']);
        }
      } else {
        let alert = await this.alertCtrl.create({
          header: 'Warning',
          message: 'User Name Or Password Incorrect',
          buttons: [
            { role: "cancel", text: "Cancel" },
            { role: "ok", text: "OK" },
          ],
          backdropDismiss: false,
          cssClass: "my-customer-alert",
        });
        await alert.present();
        alert.onDidDismiss().then((res) => {
          if (res.role == "ok") {
          }
        });
      }
    })

  }
  checkUser() {

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
