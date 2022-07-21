import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Products } from './model/products';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private afs:AngularFirestore) { }

  //add employee
  addProducts(products:Products){
    products.id=this.afs.createId();
    return this.afs.collection('/Products').add(products);

  }

  // get all employees
  getAllProducts()
  {
    return this.afs.collection('/Products').snapshotChanges();
  }
  
  //delete employee
  deleteProducts(products:Products)
  {
    return this.afs.doc('/Products/'+products.id).delete();
  }

  //update employee
  updateProducts(products:Products)
  {
    //this.deleteEmployee(employee);
    return this.afs.doc('/Products/'+products.id).update(products);
  }
}
