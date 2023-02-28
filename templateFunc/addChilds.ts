import { HTMLTemplate } from "../Classes";
import { ITemplateStructChild } from "../types/ITemplateStruct";
import { IUpdateTemplateStruct } from "../types/IUpdateTemplateStruct";

export function addChilds(
  template: HTMLTemplate[] | HTMLTemplate,
  b: ITemplateStructChild[] | IUpdateTemplateStruct
) {
  if (Array.isArray(template) || !Array.isArray(b)) return;
  b.forEach((child) => template.addChild(child));
}
