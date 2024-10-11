<script setup lang="ts">
const auth = useStore();
const route = useRouter();

const onLogout = () => {
  auth.clearCredentials();
  route.push("/login");
};
</script>

<template>
  <div class="bg-slate-100">
    <div class="w-full flex flex-col items-center min-h-screen pt-20">
      <data class="max-w-7xl w-full mx-4">
        <div class="flex justify-between w-full">
          <div class="flex pb-4 gap-2 w-full">
            <NuxtLink to="/masteritem/list">
              <Button>Master Item</Button>
            </NuxtLink>
            <NuxtLink to="/transaction/list">
              <Button>Transaction Item</Button>
            </NuxtLink>
          </div>
          <Button class="bg-red-600" @click="onLogout">LogOut</Button>
        </div>
        <slot />
      </data>
    </div>
  </div>
</template>
