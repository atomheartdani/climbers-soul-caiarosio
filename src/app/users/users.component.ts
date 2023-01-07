import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { AuthenticationGuard } from '@app/auth';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UsersDataSource } from './users.datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  dataSource: UsersDataSource;
  isLoading: boolean = false;

  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'email', 'isAdmin', 'actions'];

  constructor(
    private dialog: MatDialog,
    private authGuard: AuthenticationGuard,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  edit(user: User): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(UserDetailDialogComponent, { data: user });
      dialogRef.afterClosed().subscribe((result) => {
        this.refresh();
      });
    }
  }

  refresh() {
    this.dataSource.loadResults();
  }
}
