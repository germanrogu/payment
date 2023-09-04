export function fetchClientProgress() {
  return new Promise((resolve) => {
    const clientProgressJSON = localStorage.getItem("clientProgress");
    if (clientProgressJSON) {
      const clientProgress = JSON.parse(clientProgressJSON);
      resolve(clientProgress);
    } else {
      //TODO  Simula una carga desde la API
      setTimeout(() => {
        const response = {
          clientProgress: {},
        };
        resolve(response.clientProgress);
      }, 1000);
    }
  });
}
