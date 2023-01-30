import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { AuthenticationGuard, CredentialsService } from '@app/auth';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { UsersDataSource } from './users.datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  private filter = {};
  dataSource: UsersDataSource;
  isLoading: boolean = false;

  adminOptions = [
    { label: 'Calendario', value: 'canManageOpenings' },
    { label: 'Utenti', value: 'canManageUsers' },
  ];
  displayedColumns = ['username', 'firstname', 'lastname', 'email', 'tosConsent', 'admin', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('filterUsername') filterUsername: ElementRef;
  @ViewChild('filterFirstname') filterFirstname: ElementRef;
  @ViewChild('filterLastname') filterLastname: ElementRef;
  @ViewChild('filterEmail') filterEmail: ElementRef;
  filterAdmin: FormControl = new FormControl();

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
    this.dataSource = new UsersDataSource(this.userService);
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.refresh())).subscribe();

    const filtersList = [this.filterUsername, this.filterFirstname, this.filterLastname, this.filterEmail];
    const filtersNameList = ['username', 'firstname', 'lastname', 'email'];

    for (let i = 0; i < filtersList.length; i++) {
      fromEvent(filtersList[i].nativeElement, 'keyup')
        .pipe(
          debounceTime(250),
          distinctUntilChanged(),
          tap(() => this.applyFilter(filtersList[i].nativeElement.value, filtersNameList[i]))
        )
        .subscribe();
    }

    this.filterAdmin.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => this.applyFilterAdmin(this.filterAdmin.value))
      )
      .subscribe();
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
      isCaiArosio: false,
      updatePassword: true,
      canManageOpenings: false,
      canManageUsers: false,
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

  applyFilter(value: any, name: string): void {
    this.filter = {
      ...this.filter,
      [name]: value,
    };

    if (!value) {
      delete this.filter[name];
    }

    this.paginator.pageIndex = 0;
    this.refresh();
  }

  applyFilterAdmin(value: string[]): void {
    delete this.filter['canManageOpenings'];
    delete this.filter['canManageUsers'];

    value.forEach((val) => {
      this.filter = {
        ...this.filter,
        [val]: '1',
      };
    });

    this.paginator.pageIndex = 0;
    this.refresh();
  }

  refresh() {
    this.dataSource.loadUsers(JSON.stringify(this.filter), this.paginator.pageIndex, this.paginator.pageSize);
  }

  isMyself(user: User): boolean {
    const credentials = this.credentialsService.credentials!;
    return credentials.id === user.id;
  }
}
