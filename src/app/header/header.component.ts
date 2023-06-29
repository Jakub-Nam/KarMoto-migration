import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isBtnVisability = true;
  toggleNavbar = true;
  showAdminInterface = false;
  marked = false;
  isNavbarCollapsed = true;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.changeBtnVisability()
    this.autoLogin()
  }
  logout() {
    this.authService.logout();
    this.showAdminInterface = false;
    this.marked = false;
  }
  changeBtnVisability() {
    this.authService.user.subscribe(
      (user: User) => {
        
        if (user === this.authService.emptyUser) {
          this.isBtnVisability = true;
        }
        else {
          this.isBtnVisability = false;
          return;
        }
      });
  }
  autoLogin() {
    if (localStorage.length > 0) {
      this.authService.autoLogin();
    }
  }
}
