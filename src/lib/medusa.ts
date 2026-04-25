import Medusa from "@medusajs/js-sdk";

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL!,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
  debug: process.env.NODE_ENV !== "production",
});

export const MEDUSA_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID!;
