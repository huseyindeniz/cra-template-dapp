import { LangCode, SignMessage } from "./types";

export const siteName: string = "My Awesome Dapp";
export const siteDescription: string = "CRA Template for Dapps";
export const siteLogoUrl: string = "/assets/images/logo.webp";
export const copyrightLabel: string = "DApp CRA Template";
export const copyrightUrl: string =
  "https://github.com/huseyindeniz/cra-template-dapp";
export const copyrightLogoUrl: string =
  "https://huseyindeniz.net/static/media/logo.cf1063933b90ff363f2d.jpg";

export const WalletSignMessage: SignMessage = {
  [LangCode.EN_US]:
    "Hi there from My Awesome Dapp!" +
    "\nSign this message to prove you have access to this wallet and I'll log you in." +
    "\nThis won't cost you any token." +
    "\nTo stop hackers using your wallet, here's a unique message ID they can't guess:" +
    "\n",
  [LangCode.TR_TR]:
    "My Awesome Dapp'tan merhaba!" +
    "\nBu cüzdana erişiminiz olduğunu kanıtlamak için bu mesajı imzalayın, ben de oturumunuzu açayım." +
    "\nBu size herhangi bir jetona mal olmayacak." +
    "\nBilgisayar korsanlarının cüzdanınızı kullanmasını durdurmak için işte tahmin edemeyecekleri benzersiz bir mesaj kimliği:" +
    "\n",
};
