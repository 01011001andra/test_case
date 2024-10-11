export default async ({
  Oid,
  access_token,
}: {
  Oid: string;
  access_token: string;
}) => {
  const { error, data, status } = await useFetch(
    `https://api-app.elsoft.id/admin/api/v1/data/item/delete?Oid=${Oid}`,
    {
      method: "POST",
      body: {
        GCRecordNote: "Remark",
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return { error, data, status };
};
