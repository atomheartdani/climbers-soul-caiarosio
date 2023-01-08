import { DataSource } from '@angular/cdk/table';
import { User } from '@app/@shared/models/user.model';
import { UserService } from '@app/@shared/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class UsersDataSource extends DataSource<User> {
  private _RisultatoCaricamentoSubject = new BehaviorSubject<User[]>([]);
  private _totalElements: number = 0;

  public loading = new BehaviorSubject<boolean>(true);

  get totalElements(): number {
    return this._totalElements;
  }

  constructor(private service: UserService) {
    super();
  }

  connect(): Observable<User[]> {
    return this._RisultatoCaricamentoSubject.asObservable();
  }

  disconnect(): void {
    this._RisultatoCaricamentoSubject.complete();
  }

  public loadResults() {
    this.loading.next(true);

    this.service.getAll().subscribe((a: User[]) => {
      this._RisultatoCaricamentoSubject.next(a);
      this._totalElements = a.length;
      this.loading.next(false);
    });
  }
}
