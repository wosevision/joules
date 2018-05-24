import { ValidatorFn, AbstractControl } from '@angular/forms';

export function alphanumeric(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isAlphanumeric = /^[a-zA-Z0-9_\ ~!@#$%^&*()\-+=<>?/,.\\[{\]}:;"'|]*$/.test(control.value);
    return !isAlphanumeric
      ? {
          alphanumeric: {
            value: control.value
          }
        }
      : null;
  };
}
