import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/@shared/models/user.model';
import { AuthenticationGuard } from '@app/auth';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  create(): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      let newUser: User = {
        id: 0,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        tosConsent: false,
        isCaiArosio: false,
        updatePassword: true,
        canManageOpenings: false,
        canManageUsers: false,
      };

      const dialogRef = this.dialog.open(UserDetailDialogComponent, { data: newUser });
      dialogRef.afterClosed().subscribe((result) => {
        // TODO refresh datasource
      });
    }
  }
}
