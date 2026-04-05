export type PaymentMethod = "bank" | "cash"
type BankLogo = { name: string; fileName: string }

export const bankLogos: BankLogo[] = [
  { name: "B kash", fileName: "b-kash" },
  { name: "Visa", fileName: "visa" },
  { name: "Master Card", fileName: "master-card" },
  { name: "Indian Bank", fileName: "indian-bank" },
].map((logo) => ({
  ...logo,
  src: require(`@/assets/images/logos/${logo.fileName}.png`),
}))
