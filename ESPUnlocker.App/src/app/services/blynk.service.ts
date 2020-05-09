import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { TokenService } from './token.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlynkService {
  private token: string;
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private tokenService: TokenService
  ) {}

  private showToast(message: string) {
    this.toastController
      .create({
        message,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  toggleLock(value: boolean) {
    this.tokenService
      .getToken()
      .pipe(
        flatMap((x) =>
          this.http.get(`http://blynk-cloud.com/${x}/update/V0?value=${value}`)
        )
      )
      .subscribe((r) => {
        this.showToast(`${value ? 'Locked' : 'Unlocked'} Successfully`);
      });
  }
}
