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
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-vue-next";

const { transactionData, refresh, isLoading, isLoadings } = defineProps<{
  transactionData: RootOneTr;
  refresh: () => Promise<void>;
  isLoading: boolean;
  isLoadings: boolean;
}>();
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});
const parseToCalendarDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number); // Pisahkan dan konversi ke nomor
  console.log(toRaw(transactionData));
  return new CalendarDate(year, month, day); // Buat objek CalendarDate
};

const auth = useStore();

const value = ref<any>();
const formData = reactive({
  Company: String(auth.company),
  CompanyName: "testcase",
  Code: "<<AutoGenerate>>",
  Date: "",
  Account: "",
  AccountName: "Biaya Adm Bank - 800-01 - 800-01 (testcase)",
  Note: "",
  Status: "",
  StatusName: "",
});
const selectedItem1 = ref("bc54db2f-4b44-4401-be7d-31c21effa9c1");
const isEdit = ref(false);

const toggleEdit = () => {
  if (isLoadings) return;
  isEdit.value = !isEdit.value;
};
const handleUpdate = async () => {
  const selectedDate = `${toRaw(value?.value?.year)}-${toRaw(
    value?.value?.month
  )}-${toRaw(value?.value?.day)}`;

  const { Date, ...body } = toRaw(formData);
  for (const [key, value] of Object.entries(formData)) {
    console.log(value);
    if (!value && key !== "IsActive") {
      alert(`Please fill out the ${key} field.`);
      return;
    }
  }

  try {
    const { data, error } = await usePutOneTr({
      body: { Date: selectedDate, ...body },
      access_token: String(auth.access_token),
      Oid: transactionData.Oid,
    });
    if (data && data.value) {
      console.log(data.value);
      alert("Data berhasil diupdate");
      toggleEdit();
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
  () => [transactionData],
  (newValue) => {
    formData.Company = transactionData.Company;
    formData.Code = transactionData.Code;
    formData.Date = transactionData.Date;
    formData.Account = transactionData.Account;
    formData.Note = transactionData.Note;
    formData.Status = transactionData.Status;
    formData.StatusName = transactionData.StatusName;
    value.value = parseToCalendarDate(transactionData.Date);
  }
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Main</CardTitle>
    </CardHeader>
    <hr class="pb-4" />
    <div
      v-if="isLoading"
      class="flex items-center justify-center w-full mx-auto h-52"
    >
      <div
        class="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
      ></div>
    </div>
    <CardContent v-if="!isLoading" class="space-y-2">
      <div>
        <div class="gap-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div class="flex flex-col gap-4 items-start">
            <Label for="company" class="text-right"> Company </Label>
            <div>{{ transactionData.CompanyName }}</div>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="code" class="text-right"> Code </Label>
            <div v-if="isEdit === false">{{ transactionData.Code }}</div>
            <div v-else class="w-full">
              <Input
                id="code"
                :default-value="transactionData.Code"
                v-model="formData.Code"
              />
            </div>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="date" class="text-right"> Date </Label>
            <div v-if="isEdit === false" class="w-full">
              {{ transactionData.Date }}
            </div>
            <div v-else class="w-full">
              <Popover v-if="transactionData">
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
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-12 w-full gap-4">
            <div
              class="flex flex-col gap-4 items-start col-span-12 sm:col-span-8"
            >
              <Label for="account" class="text-right"> Account </Label>
              <div v-if="isEdit === false">
                {{ transactionData.AccountName }}
              </div>
              <div v-else class="w-full">
                <Select id="account" v-model="selectedItem1">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bc54db2f-4b44-4401-be7d-31c21effa9c1">
                        {{ transactionData.AccountName }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div
              class="flex flex-col gap-4 items-start max-w-sm w-full col-span-12 sm:col-span-4"
            >
              <Label for="status" class="text-right"> Status </Label>
              <div>
                {{ transactionData.StatusName }}
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 items-start">
            <Label for="ItemUnit" class="text-right"> Note </Label>
            <div v-if="isEdit === false" class="w-full">
              {{ transactionData.Note }}
            </div>
            <div v-else class="w-full">
              <Textarea
                :default-value="transactionData.Note"
                v-model="formData.Note"
              />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter
      v-if="!isLoading"
      class="flex gap-2 w-full items-end justify-end"
    >
      <NuxtLink to="/transaction/list">
        <Button class="bg-gray-600 text-white hover:bg-gray-500">Back</Button>
      </NuxtLink>
      <Button
        v-if="!isEdit"
        class="bg-yellow-400 text-black hover:bg-yellow-300"
        type="button"
        @click="toggleEdit"
        >Edit</Button
      >
      <Button
        v-if="isEdit"
        class="bg-gray-600 text-white hover:bg-gray-500"
        type="button"
        @click="toggleEdit"
        >Cancel</Button
      >
      <Button
        v-if="isEdit"
        class="bg-blue-600 text-white hover:bg-blue-500"
        type="button"
        @click="handleUpdate"
        >Update</Button
      >
    </CardFooter>
  </Card>
</template>
