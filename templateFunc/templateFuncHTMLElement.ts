import { IArgB } from "../types/IArgB";
import { getTemplate } from "./getTemplate";
import { templateFunc } from "./templateFunc";

export function templateFuncHTMLElement(
  result: { data: any },
  a: any,
  b?: IArgB<HTMLElement>
) {
  if (result.data != null) return;
  if (!(a instanceof HTMLElement)) return;

  const template = getTemplate(a);
  result.data = template;

  /*  if (Template.register.has(a)) {
    const template = Template.register.get(a) as Template;
    result.data = template;

    if (b != undefined) {
      result.data = templateFunc(template, b);
    }

    return result;
  } */

  if (b != undefined) {
    result.data = templateFunc(template, b);
  }

  /* if (b != undefined) {
    const newA = { ...b, _HTMLElement: a, tag: a.tagName.toLowerCase() };
    result.data = templateFunc(newA);
    return result;
  }
  result.data = new HTMLTemplate(a);
  Template.register.set(a, result.data); */
}
