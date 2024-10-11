export default async ({
  body,
  access_token,
  Oid,
}: {
  body: {
    Index: string;
    Item: string;
    // ItemName: string;
    Quantity: string;
    ItemUnit: string;
    // ItemUnitName: string;
    Note: string;
  };
  access_token: string;
  Oid: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://app.api.elsoft.id/admin/api/v1/stockissue/detail?StockIssue=${Oid}&Oid=NONE`,
    {
      lazy: true,
      method: "POST",
      body: {
        index: null,
        Item: body.Item,
        // ItemName: body.ItemName,
        Quantity: body.Quantity,
        ItemUnit: body.ItemUnit,
        // ItemUnitName: body.ItemUnitName,
        Note: body.Note,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { error, data, status };
};
