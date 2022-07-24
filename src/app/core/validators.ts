import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function noneEmptyStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmptyString: boolean = control.value?.trim().length === 0;
    return isEmptyString ? {noEmpty: 'Must include at list 1 character'} : null;
  };
}
