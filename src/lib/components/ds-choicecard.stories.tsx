import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChoiceCard, ChoiceCardGroup } from "./ds-choicecard";
import { ShoppingCart, Package, Truck, Store } from "lucide-react";

const meta: Meta<typeof ChoiceCard> = {
  title: "Data Entry/ChoiceCard",
  component: ChoiceCard,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState("standard");
    return (
      <ChoiceCardGroup value={selected} onChange={setSelected} className="max-w-md">
        <ChoiceCard value="standard" title="Standard Delivery" description="3-5 business days" icon={<Truck size={18} />} />
        <ChoiceCard value="express" title="Express Delivery" description="1-2 business days" icon={<Package size={18} />} badge="Popular" />
        <ChoiceCard value="pickup" title="Store Pickup" description="Ready in 2 hours" icon={<Store size={18} />} />
      </ChoiceCardGroup>
    );
  },
};

export const Vertical: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState("cart");
    return (
      <ChoiceCardGroup value={selected} onChange={setSelected} layout="vertical" className="max-w-lg">
        <ChoiceCard value="cart" title="Cart" description="Manage orders" icon={<ShoppingCart size={20} />} />
        <ChoiceCard value="inventory" title="Inventory" description="Track stock" icon={<Package size={20} />} />
        <ChoiceCard value="shipping" title="Shipping" description="Set delivery" icon={<Truck size={20} />} />
        <ChoiceCard value="store" title="Store" description="Configure shop" icon={<Store size={20} />} />
      </ChoiceCardGroup>
    );
  },
};

export const Disabled: StoryObj = {
  render: () => (
    <ChoiceCard
      value="disabled"
      title="Disabled Option"
      description="This option is not available"
      icon={<Package size={18} />}
      disabled
    />
  ),
};
