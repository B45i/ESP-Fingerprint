import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { from, Observable, of } from 'rxjs';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  async saveToken(value: string) {
    await Storage.set({ key: 'blynkToken', value });
  }

  getToken(): Observable<any> {
    return from(this.loadToken());
  }

  private async loadToken(): Promise<string> {
    const item = await Storage.get({ key: 'blynkToken' });
    return item.value || '';
  }
}
