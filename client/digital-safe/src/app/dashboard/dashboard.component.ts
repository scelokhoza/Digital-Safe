import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Password Safe Dashboard</h2>
    <button (click)="logout()">Logout</button>
    <h3>Add New Item</h3>
    <form (ngSubmit)="addItem()">
      <select [(ngModel)]="newItem.type" name="type">
        <option value="key">Key</option>
        <option value="password">Password</option>
      </select>
      <input [(ngModel)]="newItem.app_name" name="app_name" placeholder="App Name" required>
      <input [(ngModel)]="newItem.value" name="value" placeholder="Value" required>
      <button type="submit">Add Item</button>
    </form>
    <h3>Stored Items</h3>
    <ul>
      <li *ngFor="let item of items">
        {{ item.app_name }} ({{ item.type }}): {{ item.encrypted_value }}
      </li>
    </ul>
  `
})
export class DashboardComponent implements OnInit {
  items: any[] = [];
  newItem = { type: 'key', app_name: '', value: '' };

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(
      response => {
        this.items = response.items;
      },
      error => {
        console.error('Failed to load items', error);
      }
    );
  }

  addItem() {
    this.itemService.addItem(this.newItem).subscribe(
      () => {
        this.loadItems();
        this.newItem = { type: 'key', app_name: '', value: '' };
      },
      error => {
        console.error('Failed to add item', error);
      }
    );
  }

  logout() {
    // Implement logout logic
  }
}