import { ITemplateStruct } from "./ITemplateStruct";
import { HTMLTemplate, TextTemplate, Template } from "../Classes";

export type ITemplateFunc<T> = T extends HTMLElement
  ? HTMLTemplate
  : T extends keyof HTMLElementTagNameMap
  ? HTMLTemplate<HTMLElementTagNameMap[T]>
  : T extends ITemplateStruct
  ? HTMLTemplate
  : T extends `.${string}`
  ? HTMLTemplate[]
  : T extends `id:${string}`
  ? HTMLTemplate
  : T extends `q:${string}`
  ? HTMLTemplate
  : T extends `qAll:${string}`
  ? HTMLTemplate[]
  : T extends `textNode:${string}`
  ? TextTemplate
  : T extends "$body"
  ? HTMLTemplate<HTMLBodyElement>
  : T extends "$head"
  ? HTMLTemplate<HTMLHeadElement>
  : T extends `${infer K extends keyof HTMLElementTagNameMap}||${string}`
  ? HTMLTemplate<HTMLElementTagNameMap[K]>
  : T extends `${`.${string}` | `#${string}`}::${
      | "id"
      | "classList"
      | "events"
      | "style"
      | "attributes"}`
  ? any
  : Template;
