/// <reference types="react-scripts" />

interface Window {
  ethereum: any;
  web3: any;
}

declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement;
}
