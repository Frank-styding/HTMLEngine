import { ITemplateStruct } from "../types/ITemplateStruct";
import { IUpdateTemplateStruct } from "../types/IUpdateTemplateStruct";
import { BaseClass } from "./BaseClass";
import { Template } from "./Template";
import { TextTemplate } from "./TextTemplate";
type AddChildContext = {
  wasAdded: any;
};

export class HTMLTemplate<T extends HTMLElement = HTMLElement>
  extends Template
  implements BaseClass
{
  _name = "HTMLTemplate";
  id: string;
  classList: Set<string>;
  style: Record<string, any>;
  attributes: Record<string, any>;
  events: {
    [K in keyof HTMLElementEventMap]?: (ev: HTMLElementEventMap[K]) => any;
  };

  constructor(public element: T, info?: IUpdateTemplateStruct) {
    super();
    this.tag = element.tagName;
    this.id = element.id;
    this.classList = new Set(element.classList);
    this.style = {};
    this.attributes = {};
    this.events = {};
    if (info) {
      this.applyStruct(info);
    }
  }

  setStyle(name: string, value: string) {
    const match = name.match(/([a-z][A-Z])/g);

    if (match != null) {
      //convert cH to c-h

      match.forEach((item) => {
        const replaceValue = item[0] + "-" + item[1].toLowerCase();
        name = name.replace(item, replaceValue);
      });
    }

    this.style[name] = value;
    this.element.style.setProperty(name, value);
  }

  removeStyle(name: string) {
    delete this.style[name];
    this.element.style.removeProperty(name);
  }

  toggleClassName(name: string) {
    if (this.classList.has(name)) {
      this.classList.delete(name);
    } else {
      this.classList.add(name);
    }
    this.element.classList.toggle(name);
  }

  setStyles(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.setStyle(key, data[key]);
    });
  }

  setAttribute(name: string, value: string) {
    this.attributes[name] = value;
    this.element.setAttribute(name, value);
  }

  setAttributes(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.setAttribute(key, data[key]);
    });
  }

  setId(id: string) {
    this.id = id;
    this.element.id = id;
  }

  addClassName(name: string) {
    this.classList.add(name);
    this.element.classList.add(name);
  }

  addClassList(names: string[]) {
    names.forEach((name) => this.addClassName(name));
  }

  addEvent<K extends keyof HTMLElementEventMap>(
    event: K,
    func: (this: Template, env: HTMLElementEventMap[K]) => any
  ) {
    this.events[event] = func.bind(this) as any;
    this.element.addEventListener(event, (env: any) => func.bind(this)(env));
  }

  addEvents(data: {
    [K in keyof HTMLElementEventMap]?: (ev: HTMLElementEventMap[K]) => any;
  }) {
    Object.keys(data).forEach((key) => {
      this.addEvent(
        key as keyof HTMLElementEventMap,
        data[key as keyof HTMLElementEventMap] as (
          ev: HTMLElementEventMap[keyof HTMLElementEventMap]
        ) => any
      );
    });
  }

  setInnerHTML(data: string) {
    this.element.innerHTML = data;
  }

  addInnerHMLT(data: string) {
    this.element.innerHTML += data;
  }

  get innerHTML() {
    return this.element.innerHTML;
  }

  applyStruct(struct: IUpdateTemplateStruct) {
    if (struct.ref) {
      if (typeof struct.ref == "object") {
        if (struct.ref._name == "Ref") {
          struct.ref._template = this;
        }
      } else {
        struct.ref(this);
      }
    }

    if (struct.id) this.setId(struct.id);
    if (struct.style) this.setStyles(struct.style);
    if (struct.attributes) this.setAttributes(struct.attributes);
    if (struct.events) this.addEvents(struct.events);
    if (struct.classList) this.addClassList(struct.classList);
    if (struct.className) this.addClassName(struct.className);
    if (struct.childs) struct.childs.forEach((child) => this.addChild(child));
    if (struct.show) this.setShowProperty(struct.show);
    if (struct.innerHTML) this.setInnerHTML(struct.innerHTML);
  }

  addChild(
    child:
      | Template
      | HTMLElement
      | `textNode:${string}`
      | `template:${string}`
      | Text
      | ITemplateStruct
  ) {
    const context: AddChildContext = { wasAdded: null };
    this.addChildHTML(context, child);
    this.addChildString(context, child);
    this.addChildText(context, child);
    this.addChildTemplate(context, child);
    this.addChildTemplateStruct(context, child);
  }

  private addChildString(context: AddChildContext, child: any) {
    if (context.wasAdded != null) return;
    if (typeof child != "string") return;

    if (child.startsWith("textNode:")) {
      const data = child.replace("textNode:", "");
      const text = document.createTextNode(data);
      this.childs.push(new TextTemplate(text));
      this.element.appendChild(text);
    }
    context.wasAdded = true;
  }

  private addChildHTML(context: AddChildContext, child: any) {
    if (context.wasAdded != null) return;

    if (!(child instanceof HTMLElement)) return;
    const template = new HTMLTemplate(child);
    template.parent = this;

    this.childs.push(template);
    this.element.appendChild(child);
    context.wasAdded = true;
  }

  private addChildText(context: AddChildContext, child: any) {
    if (context.wasAdded != null) return;

    if (!(child instanceof Text)) return;

    this.childs.push(new TextTemplate(child));
    this.element.appendChild(child);
    context.wasAdded = true;
  }

  private addChildTemplate(context: AddChildContext, child: any) {
    if (context.wasAdded != null) return;

    if (!(child instanceof Template)) return;
    child.parent = this;
    this.childs.push(child);
    this.element.appendChild(child.element);
    context.wasAdded = true;
  }

  private addChildTemplateStruct(context: AddChildContext, child: any) {
    if (context.wasAdded != null) return;

    if (typeof child != "object") return;
    if (child instanceof Template) return;

    const struct = child as ITemplateStruct;
    const element = document.createElement(struct.tag);
    const template = new HTMLTemplate(element, struct);
    template.parent = this;

    this.childs.push(template);
    this.element.appendChild(template.element);
    context.wasAdded = true;
  }
}
