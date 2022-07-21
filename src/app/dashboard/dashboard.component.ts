import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Products } from '../model/products';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList: Products[] = [];
  productObj: Products = {
    id: '',
    name: '',
    image: '',
    price: '',
    offerprice: ''
  };
  id: string = '';
  name: string = '';
  image: string = '';
  price: string = '';
  offerprice: string = ''
  data: any;
  btnSubmit: string = "Add Products";
  isUpdate: boolean = false;

  constructor(private emp: SharedService,private auth:AuthService) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.emp.getAllProducts().subscribe(res => {

      this.productList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching employee data');
    })
  }

  resetForm() {
    this.id = '';
    this.name = '';
    this.image = '';
    this.price = '';
    this.offerprice = '';
    this.btnSubmit = "Add Employee";
    this.isUpdate = false;
  }
  addUpdateProducts() {
    if (this.name == '' ||  this.price == '' || this.offerprice == '') {
      alert('Fill all input fields');
      return;
    }
    else {
      if (this.isUpdate) {
        this.productObj.name = this.name;
        this.productObj.image = this.image;
        this.productObj.price = this.price;
        this.productObj.offerprice = this.offerprice;
        this.emp.updateProducts(this.productObj);
      }
      else if (!this.isUpdate) {
        this.productObj.id = '';
        this.productObj.name = this.name;
        this.productObj.image = this.image;
        this.productObj.price = this.price;
        this.productObj.offerprice = this.offerprice;

        this.emp.addProducts(this.productObj);
      }
      //this.emp.updateEmployee(this.employeeObj);

      this.resetForm();
    }
  }
  onEdit(products: Products) {
    console.log(this.productList)
    let request: any = this.productList.filter(x => x.id == products.id)[0];

    this.name = request.name
    this.image = request.image
    this.price = request.price
    this.offerprice = request.offerprice

    this.btnSubmit = "Update Products";
    this.isUpdate = true;
    //this.emp.updateEmployee = Object.assign({}, employee);
    this.productObj = products
  }
  deleteProducts(Products: Products) {
    if (window.confirm('Are you sure you want to delete ' + Products.name + ' ' + Products.image + ' ?')) {
      this.emp.deleteProducts(Products);
    }
  }
  logout()
  {
    this.auth.logout()
  }
}
