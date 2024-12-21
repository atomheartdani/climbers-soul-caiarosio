import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/@shared/confirm-dialog/confirm-dialog.component';
import { AuthenticationGuard } from '@app/@shared/guards/authentication.guard';
import { User } from '@app/@shared/models/user.model';
import { UserRbacAcronymPipe } from '@app/@shared/pipes/userRbacAcronym.pipe';
import { CredentialsService } from '@app/@shared/services/credentials.service';
import { UserService } from '@app/@shared/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, distinctUntilChanged, finalize, fromEvent, tap } from 'rxjs';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { UsersDataSource } from '../users.datasource';

@UntilDestroy()
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    UserRbacAcronymPipe,
  ],
})
export class UserListComponent implements OnInit, AfterViewInit {
  @Input() columns = {};
  @Input() isVerified: boolean;
  @Input() event: Observable<void>;
  private filter = {};
  dataSource: UsersDataSource;
  isLoading: boolean = false;

  adminOptions = [
    { label: 'Calendario', value: 'canManageOpenings' },
    { label: 'Utenti', value: 'canManageUsers' },
  ];

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
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.filter = { isVerified: this.isVerified };
    this.dataSource = new UsersDataSource(this.userService);
    this.event.pipe(untilDestroyed(this)).subscribe(() => this.refresh());
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
          tap(() => this.applyFilter(filtersList[i].nativeElement.value, filtersNameList[i])),
        )
        .subscribe();
    }

    this.filterAdmin.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => this.applyFilterAdmin(this.filterAdmin.value)),
      )
      .subscribe();
  }

  edit(user: User): void {
    if (this.authGuard.canActivate(this.route.snapshot, this.router.routerState.snapshot)) {
      const dialogRef = this.dialog.open(UserDetailDialogComponent, { data: user });
      dialogRef.afterClosed().subscribe(() => {
        this.refresh();
      });
    }
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
          this.userService
            .delete(user.id)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
              next: () => {
                this.snackBar.open("Cancellazione dell'utente completata", 'Chiudi', { duration: 2000 });
                this.refresh();
              },
              error: () => {
                const error: string = "C'è stato un errore durante la cancellazione. Riprovare più tardi";
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
