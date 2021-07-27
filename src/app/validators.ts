import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (!value){
      return null;
    }
    const hasAt = /@/.test(value);
    const hasDomain = /.com/.test(value);
    let emailValidator = hasAt && hasDomain;
    return emailValidator ? null : {emailValid : true};
  }
}
