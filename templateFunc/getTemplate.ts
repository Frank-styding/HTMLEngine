import { HTMLTemplate, Template } from "../Classes";

export function getTemplate(element: HTMLElement) {
  if (Template.register.has(element)) {
    return Template.register.get(element) as Template;
  }
  const template = new HTMLTemplate(element);
  Template.register.set(element, template);
  return template;
}
