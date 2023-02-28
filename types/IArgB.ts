import { HTMLTemplate, Template } from "../Classes";
import { ITemplateStructChild } from "./ITemplateStruct";
import { IUpdateTemplateStruct } from "./IUpdateTemplateStruct";

export type IArgB<K> = K extends Template
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends HTMLElement
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends keyof HTMLElementTagNameMap
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends "$body"
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends "$head"
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends `q:${string}`
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends `#${string}`
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends `textNode:${string}`
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : K extends `${keyof HTMLElementTagNameMap}||${string}`
  ? IUpdateTemplateStruct | ITemplateStructChild[]
  : undefined;
/* 
  | undefined
  | string
  | IUpdateTemplateStruct
  | ITemplateStructChild[]; */
