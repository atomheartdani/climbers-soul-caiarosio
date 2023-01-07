import { Injectable } from '@angular/core';
import { UserService } from '@app/@shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, map } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  helper = new JwtHelperService();

  constructor(private credentialsService: CredentialsService, private userService: UserService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.userService.login(context.username, context.password).pipe(
      map((result: any) => {
        let token = this.helper.decodeToken(result.access_token);

        const data: Credentials = {
          id: token.data.id,
          username: token.data.username,
          firstname: token.data.firstname,
          lastname: token.data.lastname,
          email: token.data.email,
          isAdmin: token.data.isAdmin,
          updatePassword: token.data.updatePassword,
          token: result.access_token,
        };
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
