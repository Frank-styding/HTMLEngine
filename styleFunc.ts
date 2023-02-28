import { templateFunc } from "./templateFunc/templateFunc";

export function createStyle(text: string) {
  templateFunc("$head").addChild(
    templateFunc({
      tag: "style",
      innerHTML: text,
    })
  );
}

export function linkStyle(path: string) {
  templateFunc("$head").addChild(
    templateFunc({
      tag: "link",
      attributes: {
        rel: "stylesheet",
        href: "./css/" + path + ".css",
      },
    })
  );
}
