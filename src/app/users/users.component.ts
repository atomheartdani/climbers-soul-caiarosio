import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { AuthenticationGuard, CredentialsService } from '@app/auth';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  isLoading: boolean = false;
  isError: boolean = false;

  displayedColumns = ['username', 'firstname', 'lastname', 'email', 'tosConsent', 'isAdmin', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authGuard: AuthenticationGuard,
    private router: Router,
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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

  create(): void {
    let newUser: User = {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      tosConsent: false,
      isAdmin: false,
      isCaiArosio: false,
      updatePassword: true,
    };

    const dialogRef = this.dialog.open(UserDetailDialogComponent, { data: newUser });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  delete(user: User): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const action = "Stai per cancellare l'utente " + user.username;
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { confirmAction: action, confirmDetail: 'Confermi?' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 0) {
          this.isLoading = true;
          this.userService.delete(user.id).subscribe({
            next: () => {
              this.isLoading = false;
              this.snackBar.open("Cancellazione dell'utente completata", 'Chiudi', { duration: 2000 });
              this.refresh();
            },
            error: (e) => {
              this.isLoading = false;
              let error: string = "C'è stato un errore durante la cancellazione. ";
              if (e['status'] === 401) {
                error += "Rieseguire l'accesso";
              } else {
                error += 'Riprovare più tardi';
              }
              this.snackBar.open(error, 'Chiudi', { duration: 10000 });
            },
          });
        }
      });
    }
  }

  refresh() {
    this.isLoading = true;
    this.isError = false;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  isMyself(user: User): boolean {
    const credentials = this.credentialsService.credentials!;
    return credentials.id === user.id;
  }
}
