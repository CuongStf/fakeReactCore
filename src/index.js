(function() {
  console.log("You are now ready to use this for development");
})();

import { updateElement } from "../virtualDOM";

const _parent = document.getElementsByClassName("vdom")[0];
const _btn = document.getElementsByClassName("btnRerender")[0];

let oldVDOM = {
  type: "div",
  props: { class: "parent" },
  children: [
    { type: "div", props: {}, children: ["1"] },
    { type: "div", props: {}, children: ["3"] },
    {
      type: "div",
      props: { class: "child" },
      children: [
        { type: "div", props: {}, children: ["5"] },
        { type: "div", props: {}, children: ["6"] }
      ]
    }
  ]
};

let newVDOM = {
  type: "div",
  props: { class: "parent" },
  children: [
    { type: "div", props: {}, children: ["1"] },
    { type: "div", props: {}, children: ["2"] },
    { type: "div", props: {}, children: ["3"] }
  ]
};

updateElement(_parent, oldVDOM);
_btn.addEventListener("click", () => {
  updateElement(_parent, newVDOM, oldVDOM);
  oldVDOM = { ...newVDOM };
  console.log("old:", oldVDOM);
  newVDOM = {
    ...newVDOM,
    ...{
      children: [
        ...newVDOM.children,
        {
          type: "div",
          props: {},
          children: ["Nguyen Manh Cuong"]
        }
      ]
    }
  };
  console.log("new:", newVDOM);
});
