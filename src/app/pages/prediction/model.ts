export interface Products1 {
    productCode: number;
    productName: string;
    defaultAmount: number;
    rounding: number;
    productType: string;
    createdOn: string;
    createdBy: string;
    supervisedOn: string;
    supervisedBy: string;
    modifiedOn?: string;
    modifiedBy?: string;
    isGroupProduct: boolean;
    isPayable: boolean;
    blocked: boolean;
    supflag: boolean;
    gLAccount: number;
  }
  