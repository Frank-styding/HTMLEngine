import { Template } from "../Classes";
import { ITemplateStruct } from "./ITemplateStruct";

export type IArgA =
  | Template
  | HTMLElement
  | ITemplateStruct
  | keyof HTMLElementTagNameMap
  | `q:${string}`
  | `qAll:${string}`
  | `.${string}`
  | `#${string}`
  | "$head"
  | "$body"
  | `${keyof HTMLElementTagNameMap}||${string}` //atributes
  | `textNode:${string}`;
