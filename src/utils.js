/** @jsx h */
function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

//? ANCHOR: compare 2 node (old & new)
export const isChange = (vOldNode, vNewNode) => {
  return (
    typeof vOldNode !== typeof vNewNode ||
    (typeof vOldNode === "string" && vOldNode !== vNewNode) ||
    vOldNode.type !== vNewNode.type
  );
};

export const isInvalidAttr = nameAttr => {
  // event not attribute
  return isEventName(nameAttr);
};

export const isEventName = nameEvent => {
  return /^on[\w]+/gi.test(nameEvent);
};

export const convertEventNameValid = nameEvent => {
  return nameEvent.slice(2).toLowerCase();
};
