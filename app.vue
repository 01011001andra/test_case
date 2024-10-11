<script setup>
import { ofetch } from "ofetch";

globalThis.$fetch = ofetch.create({ onRequest: () => {} });
</script>
<template>
  <div class="w-full min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
