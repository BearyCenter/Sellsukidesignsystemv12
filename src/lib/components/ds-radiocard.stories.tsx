import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioCard } from "./ds-radiocard";
import { CreditCard, Banknote, QrCode, Wallet } from "lucide-react";

const meta: Meta<typeof RadioCard> = {
  title: "Data Entry/RadioCard",
  component: RadioCard,
  parameters: { layout: "padded" },
};
export default meta;

const PAYMENT_OPTIONS = [
  { value: "card", title: "Credit / Debit Card", description: "Visa, Mastercard, JCB", icon: <CreditCard size={18} /> },
  { value: "transfer", title: "Bank Transfer", description: "PromptPay, QR Code", icon: <QrCode size={18} />, badge: "Instant" },
  { value: "cod", title: "Cash on Delivery", description: "Pay when received", icon: <Banknote size={18} /> },
  { value: "wallet", title: "Digital Wallet", description: "TrueMoney, LINE Pay", icon: <Wallet size={18} /> },
];

export const Default: StoryObj = {
  render: () => {
    const [val, setVal] = useState("card");
    return (
      <div className="max-w-lg">
        <RadioCard options={PAYMENT_OPTIONS} value={val} onChange={setVal} columns={2} />
      </div>
    );
  },
};

export const ListLayout: StoryObj = {
  render: () => {
    const [val, setVal] = useState("transfer");
    return (
      <div className="max-w-md">
        <RadioCard options={PAYMENT_OPTIONS} value={val} onChange={setVal} columns={1} />
      </div>
    );
  },
};
