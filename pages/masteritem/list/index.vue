<script setup lang="ts">
definePageMeta({
  layout: "list",
});

const auth = useStore();
const isLoading = ref(false);
const masterItemList = ref<any[]>([]);
const clickedData = ref<any[]>([]);

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const getMasterItem = async () => {
  isLoading.value = true;
  try {
    const { data } = await useGetMaster({
      access_token: auth?.access_token || "",
    });

    if (data && data.value) {
      masterItemList.value = data.value.data || [];
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
    const { data } = await useDeleteMaster({
      access_token: auth?.access_token || "",
      Oid: Oid,
    });

    if (data && data.value) {
      getMasterItem();
    }
  }
};

const handleCollectData = (master: any) => {
  clickedData.value = toRaw(master);
};

onMounted(() => {
  getMasterItem();
});
</script>

<template>
  <div class="rounded-lg shadow-lg w-full p-8 h-full bg-white">
    <div class="flex justify-between items-start mb-6">
      <span class="font-medium text-xl">Table Data Master Item</span>
      <MasterAddData :refresh="getMasterItem" />
    </div>
    <Table class="mx-auto h-full">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>ItemGroup</TableHead>
          <TableHead>Is Active</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableCell v-if="isLoading"></TableCell>
        <TableCell v-if="isLoading"></TableCell>
        <TableCell v-if="isLoading"></TableCell>
        <TableCell v-if="isLoading"></TableCell>
        <div
          v-if="isLoading"
          class="flex items-center justify-center w-full mx-auto h-52"
        >
          <div
            class="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
          ></div>
        </div>
        <TableRow v-else v-for="(master, index) in masterItemList" :key="index">
          <TableCell class="font-medium">
            {{ index + 1 }}
            
          </TableCell>
          <TableCell>{{ master.Label || "N/A" }}</TableCell>
          <TableCell>{{ master.CompanyName || "N/A" }}</TableCell>
          <TableCell>{{ master.Code || "N/A" }}</TableCell>
          <TableCell>{{ master.ItemGroupName || "N/A" }}</TableCell>
          <TableCell>{{ master.IsActive || "N/A" }}</TableCell>
          <TableCell>{{ master.BalanceAmount || "N/A" }}</TableCell>
          <TableCell class="flex gap-2">
            <Icon
              name="ic:baseline-delete"
              size="24"
              class="cursor-pointer hover:text-red-600"
              @click="onClickDelete(master.Oid)"
            />
            <Icon
              name="fa-solid:edit"
              size="22"
              class="cursor-pointer hover:text-blue-600"
              @click="() => (toggleOpen(), handleCollectData(master))"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <MasterEditData
      :isOpen="isOpen"
      :toggleOpen="toggleOpen"
      :refresh="getMasterItem"
      :clickedData="clickedData"
    />
  </div>
</template>
