export default defineNuxtRouteMiddleware((to, from) => {
  const privateRoute = ["/", "/masteritem/list", "/transaction/list"];
  const publicRoute = ["/login"];

  // Akses `localStorage` secara langsung untuk autentikasi
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

  if (!auth?.authenticated && privateRoute.includes(to.fullPath)) {
    return navigateTo("/login");
  }
  if (auth?.authenticated && publicRoute.includes(to.fullPath)) {
    return navigateTo("/masteritem/list");
  }
});
