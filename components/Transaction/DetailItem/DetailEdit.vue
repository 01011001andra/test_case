<script setup lang="ts">
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const route = useRoute();

const { isOpen, refresh, toggleOpen, clickedData } = defineProps<{
  refresh: () => Promise<void>;
  toggleOpen: () => void;
  isOpen: boolean;
  clickedData: any;
}>();
const isLoadingss = ref(false);
const masterItemList = ref<any[]>([]);
const auth = useStore();

const formData = reactive({
  Index: "1",
  Item: "",
  // ItemName: "",
  Quantity: "",
  ItemUnit: "",
  // ItemUnitName: "",
  Note: "",
});

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
const onUpdateMaster = async () => {
  for (const [key, value] of Object.entries(formData)) {
    if (!value && key !== "Index") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }

  try {
    const { data, error } = await usePutTrDetail({
      body: toRaw(formData),
      access_token: String(auth.access_token),
      Oid: clickedData.Oid,
      StockIssueOid: String(route.params?.oid),
    });
    if (data && data.value) {
      alert("Data has been updated");
      toggleOpen();
      refresh();
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

watch(
  () => clickedData,
  (newValue) => {
    formData.Item = clickedData.Item;
    formData.ItemUnit = clickedData.ItemUnit;
    formData.Note = clickedData.Note;
    formData.Quantity = String(Math.floor(clickedData.Quantity));
  }
);
</script>

<template>
  <div>
    <Dialog :open="isOpen">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <hr class="-mx-6" />
        <div>
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
          <div class="mt-4">
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
                      <SelectItem value="5daf6a23-472d-4921-9945-57674d5fd1aa">
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
                <Textarea
                  v-model="formData.Note"
                  :default-value="clickedData.Note"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child @click="toggleOpen">
            <Button type="button" class="bg-red-600 hover:bg-red-400">
              Close
            </Button>
          </DialogClose>
          <Button type="button" @click="onUpdateMaster"> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
