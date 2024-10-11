export interface RootOneTr {
  Oid: string;
  Company: string;
  Account: string;
  AccountName: string;
  Note: string;
  Code: string;
  CreatedAt: string;
  Date: string;
  Status: string;
  CompanyName: string;
  StatusName: string;
  Details: {
    Index: string;
    Oid?: string;
    Item: string;
    ItemName: string;
    Quantity: string;
    ItemUnit: string;
    ItemUnitName: string;
    Note: string;
  }[];
}

export default async ({
  Oid,
  access_token,
}: {
  Oid: string;
  access_token: string;
}) => {
  const { data, error, refresh, status } = await useFetch<RootOneTr>(
    `https://app.api.elsoft.id/admin/api/v1/stockissue/${Oid}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { data, error, refresh, status };
};
