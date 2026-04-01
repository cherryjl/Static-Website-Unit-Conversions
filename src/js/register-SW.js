if ("serviceWorker" in navigator) {
  const swPath = `${import.meta.env.BASE_URL}service-worker.js`;
  navigator.serviceWorker.register(swPath);
}
