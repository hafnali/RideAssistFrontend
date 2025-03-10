import { Component } from '@angular/core';

import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { RideService } from '../services/ride.service';

import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {

  custId:any
  isEdit:boolean=false

  constructor(private service:RideService,private route:Router,private router:ActivatedRoute){
    // console.log(this.router.snapshot.queryParams['custId'])
    this.custId=this.router.snapshot.queryParams['custId']

    if(this.custId){
      this.isEdit=true
      // console.log(this.isEdit)
      this.initializeForm()
    }
  }

  initializeForm(){
    this.service.retrieveCustomer(this.custId).subscribe(data=>{
      this.customerForm.patchValue(data)
    })

  }

  customerForm=new FormGroup({

    name : new FormControl("",Validators.required),
    phone:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    "vehicle_no":new FormControl("",Validators.required),
    "running_km":new FormControl("",Validators.required)

  })

  handleSubmit(){
    let formData=this.customerForm.value
    // console.log(formData)

    if(this.isEdit){
      //edit logic
        this.service.updateCustomer(this.custId,formData).subscribe(data=>{
          this.route.navigateByUrl("customers")
        })
    }
    else{

       //create logic
    this.service.createCustomer(formData).subscribe((data:any)=>{
      // console.log(data);
      this.route.navigateByUrl(`worksummary/${data.id}`)


    })
  }
}

}
