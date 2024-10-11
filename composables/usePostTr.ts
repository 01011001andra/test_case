export default async ({
  body,
  access_token,
}: {
  body: {
    Company: string;
    CompanyName: string;
    Date: string;
    Code: string;
    Account: string;
    AccountName: string;
    Note: string;
  };
  access_token: string;
}) => {
  const { error, data, status } = await useFetch<any>(
    `https://app.api.elsoft.id/admin/api/v1/stockissue`,
    {
      lazy: true,
      method: "POST",
      body: {
        Company: body.Company,
        CompanyName: body.CompanyName,
        Code: body.Code,
        Date: body.Date,
        Account: body.Account,
        AccountName: body.AccountName,
        Note: body.Note,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { error, data, status };
};
