<script setup>
import authGlobal from "~/middleware/auth.global";

definePageMeta({
  middleware: authGlobal,
});


</script>
<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    Main Page
  </div>
</template>
