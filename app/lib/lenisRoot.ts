import type Lenis from "lenis";

let rootLenis: Lenis | null = null;

export function setRootLenis(instance: Lenis | null): void {
  rootLenis = instance;
}

export function getRootLenis(): Lenis | null {
  return rootLenis;
}
