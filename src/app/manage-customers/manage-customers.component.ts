import { Component, OnInit } from '@angular/core';
import {Customer} from '../dto/customer';
import {HttpClient} from '@angular/common/http';
import {el} from '@angular/platform-browser/testing/src/browser_util';
@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss']
})
export class ManageCustomersComponent implements OnInit {

  customer: Customer[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadAllCustomers();
  }

  loadAllCustomers(): void {
    this.http.get<Customer[]>('http://localhost:8080/api/v1/customers').subscribe(customers1 => {
      this.customer = customers1;
    });
  }
  deleteCustomer(customer: Customer): void {
    this.http.delete('http://localhost:8080/api/v1/customers/' + customer.id, {observe: 'response'})
      .subscribe(response => {
        if (response.status === 200) {
          this.loadAllCustomers();
        } else {
          alert('Failed to delete the customer');
        }
      });
  }
  saveCustomer(id: string, name: string, address: string): void {
    this.http.post('http://localhost:8080/api/v1/customers', new Customer(id, name, address), {observe: 'response'})
      .subscribe(response => {
        if (response.status === 201) {
          this.loadAllCustomers();
        } else {
          alert('Faild to save the customer');
        }
      });
  }
}
