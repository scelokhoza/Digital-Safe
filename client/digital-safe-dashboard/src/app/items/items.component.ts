import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  items = [];
  type!: string;
  appName = '';
  value = '';
  showForm = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Determine the type based on the route URL
    this.type = this.activatedRoute.snapshot.routeConfig?.path === 'keys' ? 'key' : 'password';

    // Fetch items based on the determined type
    this.authService.getKeysOrPasswords().subscribe((data: any) => {
      this.items = data.items;  // Assuming the response has an 'items' field
    });
  }

  showAddForm() {
    this.showForm = !this.showForm;
  }

  addItem() {
    this.authService.addNewItem(this.type, this.appName, this.value).subscribe(() => {
      this.ngOnInit();  // Refresh the items list
      this.showForm = false;
    });
  }
}
