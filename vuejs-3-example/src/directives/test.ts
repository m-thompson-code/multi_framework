import { DirectiveBinding, withDirectives } from "vue";

export type BannerDirectiveType = DirectiveBinding<{ text: string; seconds: number }>;

export const bannerDirective1 = (el: HTMLElement, binding: BannerDirectiveType) => {
  let timeoutCounter = 0;
  const secondsToWait = binding.value.seconds ?? 5;

  //   onMounted(() => {
  //     console.log("mounted");
  //   });
  const bannerDiv = createBannerDiv(binding.value.text);
  const fomatterBannerDiv = withDirectives(bannerDiv, []);
  el.appendChild(fomatterBannerDiv);

  const interval = setInterval(() => {
    timeoutCounter++;
    console.log(timeoutCounter);

    if (timeoutCounter > secondsToWait) {
      console.log("stop");
      clearInterval(interval);
    }
  }, 1000);

  console.log(binding.value.seconds); // => "white"
  console.log(binding.value.text); // => "hello!"
};

/* 
<div class="p-4 w-full bg-red-400">
    <span> {{ message }} </span>
</div>
*/
export const createBannerDiv = (message: string) => {
  return h(
    "div",
    {
      class: "p-4 w-full bg-red-400",
      onClick: () => {
        console.log("banner clicked lol");
      }
    },
    [h("span", message)]
    //message
  );
};
