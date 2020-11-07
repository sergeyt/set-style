import isNil from "lodash/isNil";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import forEach from "lodash/forEach";
import map from "lodash/map";
import startsWith from "lodash/startsWith";
import find from "lodash/find";
import memoizeOne from "memoize-one";

// based on preact h
// DOM properties that should NOT have "px" added when numeric
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
const IS_NUMBER = /^[-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?$/;

export function stringifyValue(name: string, val: any) {
  if (isNil(val)) {
    return undefined;
  }
  if (IS_NON_DIMENSIONAL.test(name) === false) {
    if (isNumber(val)) {
      return val === 0 ? "0" : `${val}px`;
    }
    if (isString(val)) {
      const s = trim(val);
      if (!s) {
        return undefined;
      }
      return IS_NUMBER.test(s) ? `${s}px` : s;
    }
    return "0";
  }
  return String(val);
}

export function setStyle(elem: HTMLElement, css: any) {
  if (!elem) {
    return;
  }
  const style = elem.style as any;
  forEach(css, (val, key) => {
    style[key] = stringifyValue(key, val);
  });
}

const prefixes = ["ms", "webkit", "moz"];

export const cssPropertyName = memoizeOne(key => {
  let name = key;
  const prefix = find(prefixes, p => startsWith(name, p));
  if (prefix) {
    name = name.replace(prefix, `-${prefix}`);
  }
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
});

export function stringifyStyle(style: any) {
  if (!style || isEmpty(style)) {
    return undefined;
  }
  return (
    map(style, (val, key) => {
      if (isNil(val)) {
        return undefined;
      }
      const name = cssPropertyName(key);
      const str = stringifyValue(name, val);
      return str ? `${name}:${str}` : undefined;
    })
      .filter(t => !!t)
      .join(";") || undefined
  );
}
