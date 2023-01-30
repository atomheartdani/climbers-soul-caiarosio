import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';

export class UsersDataSource extends DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public totalElements: number = 0;

  constructor(private userService: UserService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.errorSubject.complete();
  }

  loadUsers(filter: string = '', pageIndex: number = 0, pageSize: number = 25): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(false);

    this.userService
      .getAll(filter, pageIndex, pageSize)
      .pipe(
        catchError(() => {
          this.errorSubject.next(true);
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((ret: any) => {
        this.usersSubject.next(ret.content);
        this.totalElements = ret.total;
      });
  }
}
