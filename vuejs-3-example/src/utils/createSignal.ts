import { shallowRef, triggerRef } from "vue";

// https://vuejs.org/guide/extras/reactivity-in-depth.html#solid-signals
export function createSignal<T>(value: T, options: any) {
  const r = shallowRef(value);
  const get = (): T => r.value;
  const set = (v: T) => {
    r.value = typeof v === "function" ? v(r.value) : v;
    if (options?.equals === false) triggerRef(r);
  };
  return [get, set];
}

// https://vuejs.org/guide/extras/reactivity-in-depth.html#angular-signals
export function signal<T>(initialValue: T) {
  const r = shallowRef(initialValue);
  const s = () => r.value;
  s.set = (value: T): void => {
    r.value = value;
  };
  s.update = (updater: (...data: any) => any) => {
    r.value = updater(r.value);
  };
  s.mutate = (mutator: (...data: any) => void) => {
    mutator(r.value);
    triggerRef(r);
  };
  return s;
}
