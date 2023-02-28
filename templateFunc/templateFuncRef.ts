import { ITemplateStruct } from "../types/ITemplateStruct";
import { Template } from "../Classes";

export function templateFuncRef(result: { data: any }, a: any) {
  if (Array.isArray(result.data)) return;
  const struct = a as ITemplateStruct;
  if (struct.ref) {
    if (typeof struct.ref == "object") {
      if (struct.ref._name == "Ref") {
        struct.ref._template = result.data as Template;
      }
    } else {
      struct.ref(result.data as Template);
    }
  }
}
