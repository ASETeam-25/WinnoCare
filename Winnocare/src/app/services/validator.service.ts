import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // static usernameValidator(control: AbstractControl): { [key: string]: any } {
  //   if (control.value) {
  //       if (!control.value.match(/[-!$%^&*()_+|~=`{}\[\]:";#@'<>?,.\/]/)) {            
  //           return null;
  //       }
  //       else {            
  //           return { 'invalidChar': true };
  //       }
  //   }

    
}
