import {
  isChange,
  isInvalidAttr,
  isEventName,
  convertEventNameValid
} from "./src/utils";

//? ANCHOR: set attribute (props: array)
const setBoooleanAttr = (_target, nameAttr, valAttr) => {
  _target.setAttribute(nameAttr, valAttr);
  _target[nameAttr] = valAttr;
};

const setAttribute = (_target, nameAttr, valAttr) => {
  // console.log(_target);
  // console.log(nameAttr);
  // console.log(valAttr);
  if (isInvalidAttr(nameAttr)) {
    return;
  } else if (nameAttr === "className") {
    _target.setAttribute("class", valAttr);
  } else if (typeof valAttr === "boolean") {
    setBoooleanAttr(_target, nameAttr, valAttr);
  } else {
    _target.setAttribute(nameAttr, valAttr);
  }
};

const setAttributes = (_target, props) => {
  Object.entries(props).forEach(([nameAttr, valAttr]) => {
    setAttribute(_target, nameAttr, valAttr);
  });
};

//? ANCHOR: remove attribute
const removeBooleanAttr = (_target, nameAttr, valAttr) => {
  _target.removeAttribute(nameAttr);
  _target[nameAttr] = false;
};

const removeAttribute = (_target, nameAttr, valAttr) => {
  if (isInvalidAttr(nameAttr)) {
    return;
  } else if (nameAttr === "className") {
    _target.removeAttribute("class");
  } else if (typeof valAttr === "boolean") {
    removeBooleanAttr(_target, nameAttr, valAttr);
  } else {
    _target.removeAttribute(nameAttr);
  }
};

//? ANCHOR: update attribute element to DOM
const updateAttribute = (_target, nameAttr, newValAttr, oldValAttr) => {
  if (!newValAttr) {
    removeAttribute(_target, nameAttr);
  } else if (!oldValAttr || newValAttr !== oldValAttr) {
    setAttribute(_target, nameAttr, newValAttr);
  }
};

const updateAttributes = (_target, newProps, oldProps = {}) => {
  Object.keys({ ...oldProps, ...newProps }).forEach(nameAttr => {
    updateAttribute(_target, nameAttr, newProps[nameAttr], oldProps[nameAttr]);
  });
};

//? ANCHOR: add event listener
const addEventListener = (_target, props) => {
  Object.entries(props).forEach(([name, val]) => {
    if (isEventName(name)) {
      _target.addEventListener(convertEventNameValid(name), val);
    }
  });
};

//? ANCHOR: remove event listener
const removeEventListener = (_target, nameEvent) => {
  _target.removeEventListener(convertEventNameValid(nameEvent));
};

const updateEvents = (_target, newProps, oldProps) => {
  Object.keys({ ...oldProps, ...newProps }).forEach(nameAttr => {
    if (isEventName(nameAttr)) {
      if (!newProps[nameAttr]) {
        _target.removeEventListener(convertEventNameValid(nameAttr));
      } else {
        _target.addEventListener(
          convertEventNameValid(nameAttr),
          newProps[nameAttr]
        );
      }
    }
  });
};

//? ANCHOR: render to real DOM
const render = node => {
  // console.log("node: ", node);
  if (!node.type) {
    return document.createTextNode(node);
  }

  let _parent = document.createElement(node.type);
  setAttributes(_parent, node.props);
  addEventListener(_parent, node.props);
  node.children
    .map(_node => render(_node))
    .forEach(_node => _parent.appendChild(_node));
  return _parent;
};

//? ANCHOR:  update to real DOM
let isRemoveChild = 0;
export const updateElement = (_parent, vNewNode, vOldNode, index = 0) => {
  // console.log("_parent: ", _parent);
  // console.log("vOldNode: ", vOldNode);
  // console.log("vNewNode: ", vNewNode);
  //*  case vNewNode is text node
  if (!vOldNode) {
    _parent.appendChild(render(vNewNode));
  } else if (!vNewNode) {
    _parent.removeChild(_parent.childNodes[index - isRemoveChild]);
    isRemoveChild++;
  } else if (isChange(vOldNode, vNewNode)) {
    _parent.replaceChild(render(vNewNode), _parent.childNodes[index]);
  } else if (vNewNode.type) {
    //* case vNewNode is node
    for (
      let _idx = 0;
      _idx < vNewNode.children.length || _idx < vOldNode.children.length;
      _idx++
    ) {
      updateElement(
        _parent.childNodes[index],
        vNewNode.children[_idx],
        vOldNode.children[_idx],
        _idx
      );
    }
    isRemoveChild = 0;
    updateAttributes(_parent.childNodes[index], vNewNode.props, vOldNode.props);
    updateEvents(_parent.childNodes[index], vNewNode.props, vOldNode.props);
  }
};
