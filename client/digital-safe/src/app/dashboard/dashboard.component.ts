import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  template: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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