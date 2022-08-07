import { FormGroup } from "@angular/forms";

export function checkVaidDep(group: FormGroup | any) {
  let parentVal = group instanceof  FormGroup ? group.getRawValue() : group.value

}