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
import { Checkbox } from "@/components/ui/checkbox";
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
const auth = useStore();
const selectedItem1 = ref("55692914-7402-4dd8-adec-40a823222b3e");
const selectedItem2 = ref("4fc9683e-f22b-47c6-9525-b054ba24ea42");
const selectedItem3 = ref("PCS");
const { isOpen, refresh, toggleOpen, clickedData } = defineProps<{
  refresh: () => Promise<void>;
  toggleOpen: () => void;
  isOpen: boolean;
  clickedData: any;
}>();

const formData = reactive({
  Company: String(auth.company),
  ItemType: "3adfb47a-eab4-4d44-bde9-efae1bec8543",
  Code: "",
  Label: "",
  ItemGroup: "",
  ItemAccountGroup: "",
  ItemUnit: "",
  IsActive: true,
});

const onUpdateMaster = async () => {
  for (const [key, value] of Object.entries(formData)) {
    console.log(value);
    if (!value && key !== "IsActive") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }
  console.log(toRaw(formData));
  try {
    const { data, error } = await usePutMaster({
      body: toRaw(formData),
      access_token: String(auth.access_token),
      Oid: clickedData.Oid,
    });
    if (data && data.value) {
      console.log(data.value);
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

watch(
  () => isOpen,
  (newValue) => {
    formData.Company = clickedData.Company;
    formData.ItemType = clickedData.ItemType;
    formData.Code = clickedData.Code;
    formData.Label = clickedData.Label;
    formData.ItemGroup = clickedData.ItemGroup;
    formData.ItemAccountGroup = "4fc9683e-f22b-47c6-9525-b054ba24ea42";
    formData.ItemUnit = "5daf6a23-472d-4921-9945-57674d5fd1aa";
    formData.IsActive = clickedData.IsActive === "Y" ? true : false;
    console.log(toRaw(clickedData));
  }
);
</script>

<template>
  <Dialog :open="isOpen">
    <!-- <DialogTrigger as-child>
      <Icon
        @click="toggleOpen"
        name="fa-solid:edit"
        size="22"
        class="cursor-pointer hover:text-blue-600"
      />
    </DialogTrigger> -->
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <div class="flex gap-2 justify-between relative">
          <DialogTitle>Edit Product</DialogTitle>
          <Button
            class="absolute -right-2 -top-2 size-5 text-black bg-white hover:bg-white z-50"
            @click="toggleOpen"
            >X</Button
          >
        </div>
        <!-- <DialogDescription> </DialogDescription> -->
      </DialogHeader>
      <hr class="-mx-6" />
      <div>
        <div class="gap-4 py-4 grid grid-cols-2">
          <div class="flex flex-col gap-4 items-start">
            <Label for="company" class="text-right"> Company </Label>
            <Input
              id="company"
              :default-value="clickedData.CompanyName"
              disabled
            />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="ItemType" class="text-right"> Item Type </Label>
            <Input
              id="ItemType"
              :default-value="clickedData.ItemTypeName"
              disabled
            />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="code" class="text-right"> Code </Label>
            <Input
              id="code"
              :default-value="clickedData.Code"
              v-model="formData.Code"
            />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="title" class="text-right"> Title </Label>
            <Input
              id="title"
              :default-value="clickedData.Label"
              v-model="formData.Label"
            />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="itemGroup" class="text-right"> Item Group </Label>
            <Select id="itemGroup" v-model="selectedItem1">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="55692914-7402-4dd8-adec-40a823222b3e">
                    Product Lain-Lain
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="itemAccountGroup" class="text-right">
              Item Account Group
            </Label>
            <Select id="itemAccountGroup" v-model="selectedItem2">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4fc9683e-f22b-47c6-9525-b054ba24ea42">
                  Default
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex flex-col gap-4 items-start">
          <Label for="ItemUnit" class="text-right"> Item Unit </Label>
          <Select id="ItemUnit" v-model="selectedItem3">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="PCS"> PCS </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center space-x-2 mt-4">
          <Checkbox
            id="terms"
            :default-checked="clickedData.IsActive === 'Y' ? true : false"
            @click="formData.IsActive = !formData.IsActive"
          />
          <label
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is Active
          </label>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="button"
            class="bg-red-600 hover:bg-red-400"
            @click="toggleOpen"
          >
            Close
          </Button>
        </DialogClose>
        <Button type="button" @click="onUpdateMaster"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
