import { TextTemplate, HTMLTemplate, Template } from "../Classes";
import { IArgA } from "../types/IArgA";
import { IArgB } from "../types/IArgB";
import { getTemplate } from "./getTemplate";
import { templateFunc } from "./templateFunc";

export function templateFuncString(
  result: { data: any },
  a: IArgA,
  b?: IArgB<string>
) {
  if (result.data != null) return;
  if (typeof a != "string") return;

  const selector = a.replace(/(::|\|\|).+/, "");

  if (selector == "$body") {
    result.data = templateFunc(document.body, b);
    return result;
  }

  if (selector == "$head") {
    result.data = templateFunc(document.head, b);
    return result;
  }

  if (selector.startsWith("#")) {
    const id = selector.replace("#", "");
    const element = document.getElementById(id) as HTMLElement;
    if (element == null) {
      throw new Error("Could not find element" + id);
    }

    result.data = templateFunc(element, b);
    return result;
  }

  if (selector.startsWith(".")) {
    const className = selector.replace("class:", "");
    const elements = document.getElementsByClassName(className);

    result.data = Array.from(elements).map(
      (element) => new HTMLTemplate(element as HTMLElement)
    );
    return result;
  }

  if (selector.startsWith("q:")) {
    const query = selector.replace("q:", "");
    const element = document.querySelector(query);

    if (element == null) {
      throw new Error("Could not find element" + query);
    }

    result.data = templateFunc(element as HTMLElement, b);
    return;
  }

  if (selector.startsWith("qAll:")) {
    const queryAll = selector.replace("qAll:", "");
    const elements = document.querySelectorAll(queryAll);
    result.data = Array.from(elements).map(
      (element) => new HTMLTemplate(element as HTMLElement)
    );
    return;
  }

  if (selector.startsWith("textNode:")) {
    const textNode = document.createTextNode(selector.replace("textNode:", ""));
    result.data = new TextTemplate(textNode);
    return result;
  }
  const attributes = a.split("||")[1];
  const { id, classNames } = setAttributes(attributes);
  const element = document.createElement(selector);
  const template = templateFunc(element, b);

  if (classNames) template.addClassList(classNames);
  if (id) template.addClassName(id);

  result.data = template;

  return result;
}

function setAttributes(attributes: undefined | string): {
  id?: string;
  classNames?: string[];
} {
  if (attributes == undefined) return {};
  const matchId = attributes.match(/#[_a-zA-Z0-9]+/g);
  const matchClass = attributes.match(/\.[_\/a-zA-Z0-9]+/g);

  let id: string | undefined;
  let classNames: string[] | undefined;
  if (matchId) {
    id = matchId[0] + "";
  }
  if (matchClass) {
    classNames = matchClass[0].replace(".", "").split("/");
  }
  return { id, classNames };
}
