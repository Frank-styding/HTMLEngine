import { ITemplateStruct } from "../types/ITemplateStruct";
import { IArgB } from "../types/IArgB";
import { HTMLTemplate } from "../Classes";
import { addChilds } from "./addChilds";

export function templateFuncTemplate(
  result: { data: any },
  a: any,
  b?: IArgB<HTMLTemplate>
) {
  if (result.data != null) return;
  if (typeof a != "object") return;
  if (a._name != "HTMLTemplate") return;

  const template = a as HTMLTemplate;

  if (b == undefined) {
    result.data = template;
    return result;
  }

  if (Array.isArray(b)) {
    addChilds(template, b);
  } else {
    template.applyStruct(b as ITemplateStruct);
  }

  result.data = template;
  return result;
}
