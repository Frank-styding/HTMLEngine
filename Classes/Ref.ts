import { BaseClass } from "./BaseClass";
import { Template } from "./Template";
import { generateUUID } from "../utils/genereUUID";

export class Ref implements BaseClass {
  _template?: Template;
  uuid: string;
  _name = "Ref";
  constructor() {
    this.uuid = generateUUID();
  }

  get template() {
    return this._template;
  }
}
