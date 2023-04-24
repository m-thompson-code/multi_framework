import { ref } from "vue";
import { useEventListener } from "./useListeners";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, "mousemove", (event: any) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}
