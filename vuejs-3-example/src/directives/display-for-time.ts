import { DirectiveBinding, VNode } from "vue";
export type DisplayForTime = DirectiveBinding<{ seconds: number }>;

export const displayForTime = (el: HTMLElement, binding: DisplayForTime) => {
  const secondsToWait = binding.value.seconds ?? 5;

  let timeoutCounter = 0;

  const interval = setInterval(() => {
    timeoutCounter++;
    console.log(timeoutCounter);

    if (timeoutCounter > secondsToWait) {
      console.log("stop");
      // hide element
      el.style.display = "none";
      clearInterval(interval);
    }
  }, 1000);
};

export const displayForTime2 = {
  mounted: (el: HTMLElement, binding: DisplayForTime, vnode: VNode) => {
    const secondsToWait = binding.value.seconds ?? 5;

    // Error: e-router.mjs:3451 ReferenceError: defineEmits is not defined
    // const emit = defineEmits<{
    //   (e: "remainingTime", value: number): void;
    // }>();

    let timeoutCounter = 0;

    const interval = setInterval(() => {
      timeoutCounter++;
      console.log(timeoutCounter);

      const emittedValue = { detail: secondsToWait - timeoutCounter };

      if (vnode.component) {
        vnode.component?.emit("remainingTime", emittedValue);
      } else {
        vnode.el?.dispatchEvent(new CustomEvent("remainingTime", emittedValue));
      }

      if (timeoutCounter > secondsToWait) {
        console.log("stop");
        // hide element
        el.style.display = "none";
        clearInterval(interval);
      }
    }, 1000);
  }
};
