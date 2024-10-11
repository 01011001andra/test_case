export default async ({
  body,
  access_token,
  Oid,
  StockIssueOid,
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
  StockIssueOid: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://api-app.elsoft.id/admin/api/v1/stockissue/detail?StockIssue=${StockIssueOid}&Oid=NONE`,
    {
      method: "POST",
      body: {
        index: body.Index,
        Oid: Oid,
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
