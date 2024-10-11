<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const isOpen = ref(false);
const isEdit = ref(false);
const masterItemList = ref<any[]>([]);
const clickedData = ref<any[]>([]);

const auth = useStore();
const isLoadingss = ref(false);
const formData = reactive({
  Index: "",
  Item: "",
  // ItemName: "",
  Quantity: "",
  ItemUnit: "",
  // ItemUnitName: "",
  Note: "",
});

const toggleOpen = () => {
  isOpen.value = !isOpen.value; // Toggle antara true dan false
};
const toggleOpenEdit = () => {
  isEdit.value = !isEdit.value; // Toggle antara true dan false
};

const { transactionData, refresh, isLoading } = defineProps<{
  transactionData: RootOneTr;
  refresh: () => Promise<void>;
  isLoading: boolean;
}>();
const handleCollectData = (transaction: any) => {
  clickedData.value = toRaw(transaction);
};
const getMasterItem = async () => {
  isLoadingss.value = true;
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
    isLoadingss.value = false;
  }
};

const onClickDelete = async (Oid: string) => {
  const confirmDelete = confirm("Are you sure?");
  if (confirmDelete) {
    const { data, status } = await useDeleteTrDetail({
      access_token: auth?.access_token || "",
      Oid: Oid,
    });

    if (status.value === "success") {
      alert("Data has been deleted");
      await refresh();
    }
  }
};

const onSubmitTr = async () => {
  for (const [key, value] of Object.entries(formData)) {
    if (!value && key !== "Index") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }

  try {
    const { data, error } = await usePostTrDetail({
      body: toRaw(formData),
      access_token: String(auth.access_token),
      Oid: transactionData.Oid,
    });
    if (data && data.value) {
      alert("Data has been added");
      Object.assign(formData, {
        Index: "",
        Item: "",
        // ItemName: "",
        Quantity: "",
        ItemUnit: "",
        // ItemUnitName: "",
        Note: "",
      });
      toggleOpen();
      await refresh();
    }
    if (error && error.value) {
      alert(error.value);
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getMasterItem();
});
</script>

<template>
  <div>
    <Card>
      <CardHeader class="flex flex-row justify-between">
        <CardTitle>Details</CardTitle>
        <Dialog :open="isOpen">
          <DialogTrigger as-child @click="toggleOpen">
            <Button
              variant="outline"
              class="bg-blue-600 text-white hover:bg-blue-400 hover:text-white"
            >
              Add
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[600px]">
            <DialogHeader>
              <div class="flex gap-2 justify-between relative">
                <DialogTitle>Add Item</DialogTitle>
                <Button
                  class="absolute -right-2 -top-2 size-5 text-black bg-white hover:bg-white z-50"
                  @click="toggleOpen"
                  >X</Button
                >
              </div>
              <!-- <DialogDescription> </DialogDescription> -->
            </DialogHeader>
            <hr class="-mx-6" />
            <div class="flex w-full flex-col gap-4 items-start">
              <Label for="Item" class="text-right"> Item </Label>
              <Select id="Item" v-model="formData.Item">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(masterItem, index) in masterItemList"
                      :key="index"
                      :value="masterItem.Oid"
                    >
                      {{ masterItem.Label }} - {{ masterItem.Code }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div class="flex w-full gap-4">
                <div class="flex w-full flex-col gap-4 items-start">
                  <Label for="Quantity" class="text-right"> Quantity </Label>
                  <Input id="Quantity" v-model="formData.Quantity" />
                </div>
                <div class="flex w-full flex-col gap-4 items-start">
                  <Label for="ItemUnit" class="text-right"> Item Unit </Label>
                  <Select id="ItemUnit" v-model="formData.ItemUnit">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          value="5daf6a23-472d-4921-9945-57674d5fd1aa"
                        >
                          PCS - PCS
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div class="flex flex-col gap-4 items-start mt-4">
                <Label for="Note" class="text-right"> Note </Label>
                <div class="w-full">
                  <Textarea v-model="formData.Note" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" @click="onSubmitTr"> Save </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <hr class="pb-4" />
      <CardContent class="space-y-2">
        <Table class="mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead> No </TableHead>
              <TableHead>Item</TableHead>
              <TableHead> Quantity </TableHead>
              <TableHead> Item Unit </TableHead>
              <TableHead> Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(transaction, index) in transactionData.Details"
              :key="index"
            >
              <TableCell class="font-medium">
                {{ index + 1 }}
              </TableCell>
              <TableCell>
                {{ transaction.ItemName }}
              </TableCell>
              <TableCell>
                {{ transaction.Quantity }}
              </TableCell>
              <TableCell>
                {{ transaction.ItemUnitName }}
              </TableCell>

              <TableCell class="flex gap-2"
                ><Icon
                  name="ic:baseline-delete"
                  size="24"
                  class="cursor-pointer hover:text-red-600"
                  @click="onClickDelete(String(transaction.Oid))"
                />
                <Icon
                  name="fa-solid:edit"
                  size="22"
                  class="cursor-pointer hover:text-blue-600"
                  @click="
                    () => (handleCollectData(transaction), toggleOpenEdit())
                  "
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div
          v-if="transactionData.Details.length === 0"
          class="text-center py-8"
        >
          Data Empty!
        </div>
      </CardContent>
    </Card>
    <TrasactionAdd />
    <TransactionDetailItemDetailEdit
      :isOpen="isEdit"
      :toggleOpen="toggleOpenEdit"
      :refresh="refresh"
      :clickedData="clickedData"
    />
  </div>
</template>
