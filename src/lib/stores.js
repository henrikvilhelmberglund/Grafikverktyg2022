// import { writable } from "svelte/store";
import { writable } from "svelte-local-storage-store";

// export const allColors = writable();
export const allColors = writable("myColors", 0);
