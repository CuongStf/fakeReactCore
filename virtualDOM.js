/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children };
}

//? render to real DOM
const render = node => {
  console.log("node: ", node);
  if (!node.type) {
    return document.createTextNode(node);
  }

  let _parent = document.createElement(node.type);
  node.children
    .map(_node => render(_node))
    .forEach(_node => _parent.appendChild(_node));
  return _parent;
};

//? compare 2 node (old & new)
const isChange = (vOldNode, vNewNode) => {
  return (
    typeof vOldNode !== typeof vNewNode ||
    (typeof vOldNode === "string" && vOldNode !== vNewNode) ||
    vOldNode.type !== vNewNode.type
  );
};

//? update to real DOM
export const updateElement = (parent, vNewNode, vOldNode, index = 0) => {
  console.log("parent: ", parent);
  console.log("vOldNode: ", vOldNode);
  console.log("vNewNode: ", vNewNode);
  // case vNewNode is text node
  if (!vOldNode) {
    parent.appendChild(render(vNewNode));
  } else if (!vNewNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (isChange(vOldNode, vNewNode)) {
    parent.replaceChild(render(vNewNode), parent.childNodes[index]);
  } else if (vNewNode.type) {
    // case vNewNode is node
    for (
      let _idx = 0;
      _idx < vOldNode.children.length || _idx < vNewNode.children.length;
      _idx++
    ) {
      console.log(`childNodes${index}:`, parent.childNodes[index]);
      updateElement(
        parent.childNodes[index],
        vNewNode.children[_idx],
        vOldNode.children[_idx],
        _idx
      );
    }
  }
};
