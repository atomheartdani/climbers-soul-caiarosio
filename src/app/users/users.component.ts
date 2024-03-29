import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/@shared/models/user.model';
import { AuthenticationGuard } from '@app/auth';
import { Observable, Subject } from 'rxjs';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
