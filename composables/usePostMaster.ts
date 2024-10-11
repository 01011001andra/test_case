export default async ({
  body,
  access_token,
}: {
  body: {
    Company: string;
    ItemType: string;
    Code: string;
    Label: string;
    ItemGroup: string;
    ItemAccountGroup: string;
    ItemUnit: string;
    IsActive: boolean;
  };
  access_token: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://app.api.elsoft.id/admin/api/v1/item`,
    {
      lazy: true,
      method: "POST",
      body: {
        Company: body.Company,
        ItemType: body.ItemType,
        Code: body.Code,
        Label: body.Label,
        ItemGroup: body.ItemGroup,
        ItemAccountGroup: body.ItemAccountGroup,
        ItemUnit: body.ItemUnit,
        IsActive: body.IsActive,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return { error, data, status };
};
