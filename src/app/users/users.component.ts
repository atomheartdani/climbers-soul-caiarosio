import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '@app/@shared/services/user.service';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh() {
    this.dataSource.loadResults();
  }
}
