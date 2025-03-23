import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationGuard } from '@app/@shared/guards/authentication.guard';
import { User } from '@app/@shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [MatButtonModule, MatIconModule, UserListComponent],
})
export class UsersComponent {
  usersColumns = ['username', 'firstname', 'lastname', 'email', 'tosConsent', 'admin', 'actions'];
  usersToVerifyColumns = ['username', 'firstname', 'lastname', 'email', 'actions'];
  refreshSubject: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  create(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const newUser: User = {
        id: 0,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        caiSection: '',
        tosConsent: false,
        updatePassword: true,
        canManageOpenings: false,
        canManageUsers: false,
        isVerified: true,
      };

      const dialogRef = this.dialog.open(UserDetailDialogComponent, { data: newUser });
      dialogRef.afterClosed().subscribe((result) => {
        this.refreshSubject.next();
      });
    }
  }

  get event(): Observable<void> {
    return this.refreshSubject.asObservable();
  }
}
