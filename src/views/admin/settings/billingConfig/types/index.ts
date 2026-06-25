import { z } from "zod";

export const SALE_CHANNELS = ["POS", "WEB"] as const;

// Schema Principal basado en el modelo Prisma
export const billingConfigSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  channel: z.enum(SALE_CHANNELS),
  cai: z.string(),
  rangeFrom: z.string(),
  rangeTo: z.string(),
  limitDate: z.string(),
  prefix: z.string(),
  currentSequence: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Schema para obtener uno solo
export const getBillingConfigSchema = billingConfigSchema.pick({
  channel: true,
  cai: true,
  rangeFrom: true,
  rangeTo: true,
  limitDate: true,
  prefix: true,
  currentSequence: true,
  isActive: true,
});

// Schema de obtener un arreglo []
export const getBillingConfigsSchema = z.array(
  billingConfigSchema.pick({
    uuid: true,
    channel: true,
    cai: true,
    rangeFrom: true,
    rangeTo: true,
    limitDate: true,
    prefix: true,
    currentSequence: true,
    isActive: true,
  }),
);

// Types Exportados
export type BillingConfigType = z.infer<typeof billingConfigSchema>;
export type getBillingConfigType = Pick<
  BillingConfigType,
  | "channel"
  | "cai"
  | "rangeFrom"
  | "rangeTo"
  | "limitDate"
  | "prefix"
  | "currentSequence"
  | "isActive"
>;
export type createBillingConfigType = Pick<
  BillingConfigType,
  | "channel"
  | "cai"
  | "rangeFrom"
  | "rangeTo"
  | "limitDate"
  | "prefix"
  | "currentSequence"
  | "isActive"
>;
export type updateBillingConfigType = createBillingConfigType;
