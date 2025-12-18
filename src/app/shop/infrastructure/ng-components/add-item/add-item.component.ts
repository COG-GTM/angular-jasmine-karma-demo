import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class AddItemComponent implements OnInit {

   form: UntypedFormGroup;

   constructor(private fb: UntypedFormBuilder,) { }

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
