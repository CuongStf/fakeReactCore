(function() {
  console.log("You are now ready to use this for development");
})();

import { updateElement } from "../virtualDOM";

const _parent = document.getElementsByClassName("vdom")[0];
const _btn = document.getElementsByClassName("btnRerender")[0];
let numberUpdate = 0;

let oldVDOM = {
  type: "div",
  props: { className: "parent" },
  children: [
    {
      type: "div",
      props: {
        className: "nguyenmanhcuong",
        onClick: () => alert(`nguyen manh cuong`)
      },
      children: ["1"]
    },
    {
      type: "div",
      props: { className: "cuong" },
      children: [
        "3",
        { type: "div", props: {}, children: ["5"] },
        { type: "div", props: {}, children: ["6"] }
      ]
    },
    {
      type: "div",
      props: { className: "child" },
      children: [
        "nguyen manh cuong",
        { type: "div", props: {}, children: ["5"] },
        { type: "div", props: {}, children: ["6"] }
      ]
    }
  ]
};

let newVDOM = {
  type: "div",
  props: { className: "parent" },
  children: [
    {
      type: "button",
      props: { onClick: () => alert(`cuongStf`) },
      children: ["1"]
    },
    { type: "div", props: { className: "cuongstf" }, children: ["2"] },
    {
      type: "div",
      props: { onClick: () => alert(`event =))`) },
      children: ["3"]
    }
  ]
};

updateElement(_parent, oldVDOM);
_btn.addEventListener("click", () => {
  updateElement(_parent, newVDOM, oldVDOM);
  oldVDOM = { ...newVDOM };
  numberUpdate++;
  // console.log("old:", oldVDOM);
  newVDOM = {
    ...newVDOM,
    ...{
      children: [
        ...newVDOM.children,
        {
          type: "div",
          props: {
            className: "nmcvue98",
            onClick: () => alert(`add number ${numberUpdate}`)
          },
          children: ["Nguyen Manh Cuong"]
        }
      ]
    }
  };
  // console.log("new:", newVDOM);
});
