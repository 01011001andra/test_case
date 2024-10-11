<script setup lang="ts">
definePageMeta({
  layout: "list",
});
const auth = useStore();
const isLoading = ref(false);
const isDeleting = ref(false);
const transactionList = ref<any[]>([]);
const clickedData = ref<any[]>([]);

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const getTransaction = async () => {
  isLoading.value = true;
  try {
    const { data } = await useGetTrList({
      access_token: auth?.access_token || "",
    });

    if (data && data.value) {
      transactionList.value = data.value.data || [];
    } else {
      console.warn("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching master items:", error);
  } finally {
    isLoading.value = false;
  }
};

const onClickDelete = async (Oid: string) => {
  const confirmDelete = confirm("Are you sure?");
  if (confirmDelete) {
    isDeleting.value = true;
    const { data, status, error } = await useDeleteTr({
      access_token: auth?.access_token || "",
      Oid: Oid,
    });

    if (status.value === "success") {
      getTransaction();
      isDeleting.value = false;
    }
    if (status.value === "error") {
      alert(error);
      isDeleting.value = false;
    }
  }
};

onMounted(() => {
  getTransaction();
});
</script>

<template>
  <div class="rounded-lg shadow-lg w-full p-8 h-full bg-white">
    <div class="flex justify-between items-start mb-6">
      <span class="font-medium text-xl">Table Data Transaction Item</span>
      <TransactionAddData :refresh="getTransaction" />
    </div>
    <Table class="mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead> No </TableHead>
          <TableHead>Company</TableHead>
          <TableHead> Code </TableHead>
          <TableHead> Date </TableHead>
          <TableHead> Account </TableHead>
          <TableHead> Status </TableHead>
          <TableHead> Action </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableCell v-if="isLoading || isDeleting"></TableCell>
        <TableCell v-if="isLoading || isDeleting"></TableCell>
        <TableCell v-if="isLoading || isDeleting"></TableCell>
        <div
          v-if="isLoading || isDeleting"
          class="flex items-center justify-center w-full mx-auto h-52"
        >
          <div
            class="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
          ></div>
        </div>
        <TableRow
          v-else
          v-for="(transaction, index) in transactionList"
          :key="transaction.oid"
        >
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell>{{ transaction.CompanyName }}</TableCell>
          <TableCell>{{ transaction.Code }}</TableCell>
          <TableCell>{{ transaction.dCreatedAt }}</TableCell>
          <TableCell>{{ transaction.AccountName }}</TableCell>
          <TableCell>
            {{ transaction.StatusName }}
          </TableCell>
          <TableCell class="flex gap-2"
            ><Icon
              name="ic:baseline-delete"
              size="24"
              class="cursor-pointer hover:text-red-600"
              @click="onClickDelete(transaction.Oid)"
            />
            <NuxtLink :to="`/transaction/detail/item/${transaction.Oid}`">
              <Icon
                name="fa-solid:edit"
                size="22"
                class="cursor-pointer hover:text-blue-600"
              />
            </NuxtLink>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
