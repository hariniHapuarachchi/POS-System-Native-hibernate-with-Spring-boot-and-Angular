import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  customerCount: number = 10;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/api/v1/customers').subscribe(value => {
      this.customerCount = value.length;
    });
  }

}
