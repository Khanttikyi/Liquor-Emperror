import { FormGroup } from "@angular/forms";
import { InputDependency } from "./form-component/field.interface";

export function checkVaidDep(dependency: InputDependency, group: FormGroup | any) {
  let parentVal = group instanceof  FormGroup ? group.getRawValue() : group.value
  let parentData = parentVal[dependency.parentName]
  if (dependency.show) {
    if (dependency.isArray) {
      return (dependency.value as string[]).includes(parentData)
    } else {
      return parentData == dependency.value
    }
  } else {
    return parentData ? true : false
  }

}