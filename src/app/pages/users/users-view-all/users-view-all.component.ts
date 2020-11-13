import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {UsersService} from '@core/backend/common/services/users.service';


@Component({
  selector: 'ngx-users-view-all',
  templateUrl: './users-view-all.component.html',
  styleUrls: ['./users-view-all.component.scss'],
})
export class UsersViewAllComponent implements OnInit {
  userList: any;

  settings = {
    mode: 'external',
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.usersService.list().subscribe(users => {
      this.userList = users;
    });
  }

  addUser(): void {
    this.router.navigate(['/pages/users/add']);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditClick(event): void {
    this.router.navigate([`/pages/users/edit/${event.data.id}`]);
  }

  onRowSelect(event): void {
    this.router.navigate([`/pages/users/edit/${event.data.id}`]);
  }
}
