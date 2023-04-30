import { DirectiveBinding } from "vue";

export const sticky = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<any>, vnode: VNode) => {
    const loc = binding.arg === "bottom" ? "bottom" : "top";
    el.style.position = "fixed";
    el.style[loc] = "0";
    el.style.background = "#7e7e7e";
    el.style.height = "50px";
    el.style.fontSize = "18px";
    el.style.width = "100%";
    el.style.paddingTop = "10px";
    el.style.textAlign = "center";
    el.style.color = "white";
    el.style.zIndex = "1000";
  }
};
