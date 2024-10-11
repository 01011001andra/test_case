export default async ({
  body,
  access_token,
  Oid,
}: {
  body: {
    Company: string;
    CompanyName: string;
    Code: string;
    Date: string;
    Account: string;
    AccountName: string;
    Status: string;
    StatusName: string;
    Note: string;
  };
  access_token: string;
  Oid: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://app.api.elsoft.id/admin/api/v1/stockissue/${Oid}`,
    {
      lazy: true,
      method: "POST",
      body: {
        Oid: Oid,
        Company: body.Company,
        CompanyName: body.CompanyName,
        Code: body.Code,
        Date: body.Date,
        Account: body.Account,
        AccountName: body.AccountName,
        Status: body.Status,
        StatusName: body.StatusName,
        Note: body.Note,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { error, data, status };
};
