import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  items = [];
  type!: string;
  appName = '';
  value = '';
  showForm = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.type = this.router.url.includes('keys') ? 'key' : 'password';
    this.authService.getKeysOrPasswords().subscribe(data => {
      this.items = data;
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
