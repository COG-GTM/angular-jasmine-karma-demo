import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-add-item',
   standalone: false,
   templateUrl: './add-item.component.html',
   styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

   form: FormGroup;

   constructor(private fb: FormBuilder,) { }

   ngOnInit(): void {
      this.formInit();
   }

   formInit() {
      this.form = this.fb.group({
         name: ['', Validators.required],
         description: ['', Validators.required],
         price: ['', Validators.required],
      });
   }

   saveItem() {
      console.info('saveItem');
   }

   /*
   setForm(){
      this.employeeDetail.controls["name"].setValue(this.employee.name);
      this.employeeDetail.controls["surname"].setValue(this.employee.surname);
      this.employeeDetail.controls["companyEmail"].setValue(this.employee.companyEmail);
      this.employeeDetail.controls["personalEmail"].setValue(this.employee.personalEmail);
      this.employeeDetail.controls["address"].setValue(this.employee.address);
      this.employeeDetail.controls["englishLevel"].setValue(this.employee.englishLevel);
   }
   */
}
