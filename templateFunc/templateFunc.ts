import { ITemplateFunc } from "../types/ITFunc";
import { HTMLTemplate, Template } from "../Classes";
import { IArgA } from "../types/IArgA";
import { IArgB } from "../types/IArgB";
import { templateFuncHTMLElement } from "./templateFuncHTMLElement";
import { templateFuncString } from "./templateFuncString";
import { templateFuncTemplate } from "./templateFuncHTMLTemplate";
import { templateFuncStruct } from "./templateFuncStruct";
import { templateFuncRef } from "./templateFuncRef";
import { ITemplateStruct } from "../types/ITemplateStruct";

export function templateFunc<T extends IArgA>(
  a: T,
  b?: IArgB<T>
): ITemplateFunc<T> {
  const result: { data: null | Template[] | Template } = {
    data: null,
  };

  templateFuncString(result, a, b as IArgB<string>);
  templateFuncHTMLElement(result, a, b as IArgB<HTMLElement>);
  templateFuncTemplate(result, a, b as IArgB<HTMLTemplate>);
  templateFuncStruct(result, a, b as IArgB<ITemplateStruct>);
  templateFuncRef(result, a);

  return result.data as ITemplateFunc<T>;
}
