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
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";

import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Calendar } from "@/components/ui/calendar";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const router = useRouter();
const route = useRoute();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const props = defineProps<{
  refresh: () => Promise<void>; // Tipe fungsi refresh
}>();

const auth = useStore();

const isOpen = ref(false);

const formData = reactive({
  Company: String(auth.company),
  CompanyName: "testcase",
  Code: "<<AutoGenerate>>",
  Date: "",
  Account: "",
  AccountName: "Biaya Adm Bank - 800-01 - 800-01 (testcase)",
  Note: "",
});

const toggleOpen = () => {
  isOpen.value = !isOpen.value; // Toggle antara true dan false
};
const onSubmitTransaction = async () => {
  const selectedDate = `${toRaw(value?.value?.year)}-${toRaw(
    value?.value?.month
  )}-${toRaw(value?.value?.day)}`;
  if (!value.value) return alert("Please fill Date!");
  for (const [key, value] of Object.entries(formData)) {
    if (!value && key !== "Date") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }
  const { Date, ...body } = toRaw(formData);

  try {
    const { data, error } = await usePostTr({
      body: { Date: selectedDate, ...body },
      access_token: String(auth.access_token),
    });
    if (data && data.value) {
      toggleOpen();
      router.push(`/transaction/detail/item/${data.value.Oid}`);
      await props.refresh();
    }
    if (error && error.value) {
      alert(error.value);
    }
  } catch (error) {
    console.log(error);
  }
};
const value = ref<DateValue>();

watch(
  () => value,
  (newValue) => {
    console.log(newValue);
    console.log(value);
  }
);
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
            <Label for="code" class="text-right"> Code </Label>
            <Input id="code" value="<<Auto>>" defaultValue="<<Auto>>" />
          </div>
        </div>
        <div class="flex gap-4 flex-col">
          <div class="flex flex-col gap-4 items-start">
            <Label for="date" class="text-right"> Date </Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start h-[40px] text-left font-normal',
                      !value && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{
                    value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Pick a date"
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="value" initial-focus />
              </PopoverContent>
            </Popover>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="account" class="text-right"> Account </Label>
            <Select id="account" v-model="formData.Account">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="bc54db2f-4b44-4401-be7d-31c21effa9c1">
                    Biaya Adm Bank - 800-01 - 800-01 (testcase)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="ItemUnit" class="text-right"> Note </Label>
            <Textarea v-model="formData.Note" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" @click="onSubmitTransaction"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
