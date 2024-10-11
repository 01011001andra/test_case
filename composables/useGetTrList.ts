export interface ApiResponse {
  data: RootMaster[];
}

export interface RootMaster {
  Oid: string;
  ItemType: string;
  dCreatedAt: string;
  dUpdatedAt: string;
  PubPost: string;
  ppCountComment: number;
  ppFeaturedApproved: any;
  ppCountLogs: number;
  ppCountFiles: number;
  ppCountDocuments: any;
  ppCountRecurring: any;
  Label: string;
  Company: string;
  CompanyName: string;
  Code: string;
  PurchaseBusinessPartner: any;
  PurchaseBusinessPartnerName: any;
  ItemGroup: string;
  ItemGroupName: string;
  IsActive: string;
  BalanceAmount: string;
  ItemTypeName: string;
  ItemTypeCode: string;
  RowCountNumber: number;
  ListFormat: ListFormat;
  Action: Action[];
  DefaultAction: DefaultAction;
}

export interface ListFormat {
  Oid: string;
  Title: string;
  Subtitle: string;
  RightSub: any;
  Right: any;
  Color: string;
  Icon: string;
  State: any;
  Data: Data;
  Details: Detail[];
}

export interface Data {
  dCreatedAt: string;
  dUpdatedAt: string;
  Label: string;
  ItemGroupName: string;
  IsActive: string;
  BalanceAmount: string;
  ItemTypeName: string;
  ItemTypeCode: string;
  RowCountNumber: number;
}

export interface Detail {
  Name: string;
  Icon: any;
  Value: any;
}

export interface Action {
  name: string;
  icon: string;
  type: string;
  showModal?: boolean;
  post?: string;
  organize?: string;
  afterRequest?: string;
  get?: string;
  config?: string;
  url?: string;
  newTab?: boolean;
  show?: boolean;
  hide?: boolean;
  afterRequest2?: string;
  form?: Form[];
}

export interface Form {
  fieldToSave: string;
  hiddenField?: string;
  type: string;
  column?: string;
  source?: any[];
  store?: string;
  params?: Params;
  hideInput?: boolean;
  validationParams?: string;
  default?: number;
  overrideLabel?: string;
  placeHolder?: string;
}

export interface Params {
  type?: string;
  term: string;
  itemtypecode?: string;
}

export interface DefaultAction {
  name: string;
  icon: string;
  type: string;
  showModal: boolean;
  post: string;
  organize: string;
  afterRequest: string;
  get: string;
  config: string;
}

export default async ({ access_token }: { access_token: string }) => {
  const { data, error, refresh, status } = await useFetch<ApiResponse>(
    `https://app.api.elsoft.id/admin/api/v1/stockissue/list?page=1&size=10`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { data, error, refresh, status };
};
