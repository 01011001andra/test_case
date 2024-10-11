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

const auth = useStore();
const route = useRoute();
const isEdit = ref(false);

const toggleEdit = () => {
  isEdit.value = !isEdit.value; // Toggle antara true dan false
};

const transactionData = ref<RootOneTr>({
  Account: "",
  Code: "",
  Company: "",
  CompanyName: "",
  CreatedAt: "",
  Date: "",
  Note: "",
  Oid: "",
  Status: "",
  StatusName: "",
  AccountName: "",
  Details: [
    {
      Index: "",
      Item: "",
      ItemName: "",
      ItemUnit: "",
      ItemUnitName: "",
      Note: "",
      Quantity: "",
    },
  ],
});
const clickedData = ref<any[]>([]);
const isLoading = ref(false);
const isLoadings = ref(false);

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const getOneTransaction = async () => {
  isLoading.value = true;

  try {
    const { data } = await useGetOneTr({
      access_token: auth?.access_token || "",
      Oid: String(route.params?.oid),
    });

    if (data && data.value) {
      transactionData.value = data.value;
    } else {
      console.warn("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching master items:", error);
  } finally {
    isLoading.value = false;
  }
};
const getOneTransactions = async () => {
  isLoadings.value = true;

  try {
    const { data } = await useGetOneTr({
      access_token: auth?.access_token || "",
      Oid: String(route.params?.oid),
    });

    if (data && data.value) {
      transactionData.value = data.value;
    } else {
      console.warn("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching master items:", error);
  } finally {
    isLoadings.value = false;
  }
};

onMounted(() => {
  getOneTransaction();
});
</script>

<template>
  <div class="flex justify-center pt-20 w-full min-h-screen">
    <div class="max-w-7xl w-full">
      <Tabs default-value="main" class="w-full">
        <TabsList class="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="main" @click="getOneTransactions">
            Main
          </TabsTrigger>
          <TabsTrigger value="details"> Details </TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          <TransactionDetailItemMain
            :transaction-data="transactionData"
            :refresh="getOneTransaction"
            :isLoading="isLoading"
            :isLoadings="isLoadings"
          />
        </TabsContent>
        <TabsContent value="details">
          <TransactionDetailItemDetail
            :transaction-data="transactionData"
            :refresh="getOneTransaction"
            :isLoading="isLoading"
          />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
