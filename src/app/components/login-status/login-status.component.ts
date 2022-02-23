import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string | undefined;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      //
      // User full name is exposed as a property name
      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;

        // store user's first and last name in browser
        const userFirstName = this.userFullName?.split(' ')[0].toString();
        const userLastName = this.userFullName?.split(' ')[1].toString();

        this.storage.setItem('userFirstName', JSON.stringify(userFirstName));
        this.storage.setItem('userLastName', JSON.stringify(userLastName));

        // retrieve the user's email from authentication response
        const email = res.email;

        // store the email in browser
        this.storage.setItem('userEmail', JSON.stringify(email));
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }
}