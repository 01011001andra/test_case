export default async ({
  Oid,
  access_token,
}: {
  Oid: string;
  access_token: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://app.api.elsoft.id/admin/api/v1/stockissue/detail/${Oid}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return { error, data, status };
};
