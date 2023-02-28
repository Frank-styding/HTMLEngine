import { Ref } from "../Classes/Ref";
import { Template } from "../Classes";

export type ITemplateStructChild =
  | Template
  | ITemplateStruct
  | HTMLElement
  | Text
  | `textNode:${string}`
  | `template:${string}`;

export interface ITemplateStruct {
  tag: string;
  className?: string;
  classList?: string[];
  id?: string;
  style?: Record<string, string>;
  attributes?: Record<string, any>;
  childs?: ITemplateStructChild[];
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref;
  innerHTML?: string;
  show?: boolean;
}
