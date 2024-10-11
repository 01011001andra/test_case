<script setup lang="ts">
import authGlobal from "~/middleware/auth.global";

definePageMeta({
  middleware: authGlobal,
});
const authStore = useStore();
const isLoading = ref(false);
const errorMessage = ref("");
const formData = reactive({
  UserName: "",
  Password: "",
});
const router = useRouter();
const onClickLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const { error, data, status } = await useLogin({ body: toRaw(formData) });
    console.log(status.value);
    if (status.value === "success") {
      authStore.setCredentials(
        data?.value?.access_token || "",
        data?.value?.refresh_token || "",
        data?.value?.company || "d3170153-6b16-4397-bf89-96533ee149ee"
      );
      router.push("/masteritem/list");
    }
    if (status.value === "error") {
      console.log(error?.value?.data);
      errorMessage.value = error?.value?.data?.message;
      return;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle class="text-2xl"> Please Sign In </CardTitle>
        <CardDescription>
          Enter your UserName below to login to your account.
        </CardDescription>

        <span
          v-if="errorMessage"
          class="bg-red-600/90 border rounded-lg p-4 text-sm text-white"
          >{{ errorMessage }}</span
        >
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="UserName">UserName</Label>
          <Input
            v-model="formData.UserName"
            id="UserName"
            type="UserName"
            placeholder="01011001andra...."
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="Password">Password</Label>
          <Input
            v-model="formData.Password"
            id="Password"
            type="password"
            required
            placeholder="********"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="onClickLogin" :disabled="isLoading">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
