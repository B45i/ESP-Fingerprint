import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

import { TokenService } from './token.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlynkService {
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private tokenService: TokenService,
    private androidFingerprintAuth: AndroidFingerprintAuth
  ) {}

  toggleLock(value: boolean) {
    if (value) {
      this.updateServer(false);
    } else {
      this.authorizeUnlock();
    }
  }

  private showToast(message: string) {
    this.toastController
      .create({
        message,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  private updateServer(value: boolean) {
    this.tokenService
      .getToken()
      .pipe(
        flatMap((x) =>
          this.http.get(`http://blynk-cloud.com/${x}/update/V0?value=${value}`)
        )
      )
      .subscribe(
        (r) => {
          this.showToast(`${value ? 'Locked' : 'Unlocked'} Successfully`);
        },
        (err) => {
          console.error('BLYNK');
          console.error(err);
          this.showToast(err.message);
        }
      );
  }

  private authorizeUnlock() {
    this.androidFingerprintAuth
      .isAvailable()
      .then((fp) => {
        if (fp.isAvailable) {
          this.androidFingerprintAuth
            .encrypt({
              clientId: 'ESPUnlocker',
            })
            .then((result) => {
              if (result.withFingerprint || result.withBackup) {
                this.updateServer(true);
              } else {
                this.showToast('Authentication failed');
              }
            })
            .catch((error) => {
              if (
                error ===
                this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED
              ) {
                this.showToast('Fingerprint authentication cancelled');
              }
            });
        } else {
          this.showToast(`ingerprint auth isn't available`);
        }
      })
      .catch((error) => console.error(error));
  }
}
