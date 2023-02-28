import { Template, HTMLTemplate } from "../Classes";
import { ITemplateStruct } from "../types/ITemplateStruct";
import { IArgB } from "../types/IArgB";

export function templateFuncStruct(
  result: { data: any },
  a: any,
  b?: IArgB<ITemplateStruct>
) {
  if (result.data != null) return;
  if (typeof a != "object") return;
  const struct = a as ITemplateStruct;
  const element = document.createElement(struct.tag);
  const template = new HTMLTemplate(element, struct);
  Template.register.set(element, template);

  result.data = template;
  return result;
}
