import { Component } from '@angular/core';
import { JsonService } from './json.service';

@Component({
  selector: 'app-json',
  template: `
  <h1>{{ title }}</h1>
    <ol>
      <li *ngFor="let item of data">
        {{ item.name }} <br>
        {{ item.email }} <br>
        {{ item.body }} <br>
      </li>
    </ol>
    `,
  styleUrls: ['./json.component.scss']
})
export class JsonComponent {
  title = 'JSON Example';
  data: any;

  constructor(private jsonService: JsonService) {}

  ngOnInit() {
    this.jsonService.getGuide().subscribe(data => {
      this.data = data;
    });
  }
}
