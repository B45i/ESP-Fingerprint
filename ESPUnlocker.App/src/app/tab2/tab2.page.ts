import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  blynkToken = '';
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(t => this.blynkToken = t);
  }

  save() {
    this.tokenService.saveToken(this.blynkToken);
  }

}
