<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

const props = defineProps<{
  refresh: () => Promise<void>; // Tipe fungsi refresh
}>();

const auth = useStore();

const isOpen = ref(false);

const formData = reactive({
  Company: String(auth.company),
  ItemType: "3adfb47a-eab4-4d44-bde9-efae1bec8543",
  Code: "<<Auto>>",
  Label: "",
  ItemGroup: "",
  ItemAccountGroup: "",
  ItemUnit: "",
  IsActive: true,
});

const toggleOpen = () => {
  isOpen.value = !isOpen.value; // Toggle antara true dan false
};

const onSubmitMaster = async () => {
  for (const [key, value] of Object.entries(formData)) {
    console.log(value);
    if (!value) {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }

  try {
    const { data, error } = await usePostMaster({
      body: toRaw(formData),
      access_token: String(auth.access_token),
    });
    if (data && data.value) {
      toggleOpen();
      await props.refresh();
    }
    if (error && error.value) {
      alert(error.value);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Dialog :open="isOpen">
    <DialogTrigger as-child @click="toggleOpen">
      <Button
        variant="outline"
        class="bg-blue-600 text-white hover:bg-blue-400 hover:text-white"
      >
        Add New Data
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <div class="flex gap-2 justify-between relative">
          <DialogTitle>Add Product</DialogTitle>
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
            <Input id="company" value="testcase" defaultValue="testcase" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="ItemType" class="text-right"> Item Type </Label>
            <Input id="ItemType" value="Product" defaultValue="Product" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="code" class="text-right"> Code </Label>
            <Input id="code" value="<<Auto>>" defaultValue="<<Auto>>" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="title" class="text-right"> Title </Label>
            <Input id="title" placeholder="Title" v-model="formData.Label" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="itemGroup" class="text-right"> Item Group </Label>
            <Select id="itemGroup" v-model="formData.ItemGroup">
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
            <Select id="itemAccountGroup" v-model="formData.ItemAccountGroup">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="4fc9683e-f22b-47c6-9525-b054ba24ea42">
                    Default
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex flex-col gap-4 items-start">
          <Label for="ItemUnit" class="text-right"> Item Unit </Label>
          <Select id="ItemUnit" v-model="formData.ItemUnit">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5daf6a23-472d-4921-9945-57674d5fd1aa">
                  PCS
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" @click="onSubmitMaster"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
