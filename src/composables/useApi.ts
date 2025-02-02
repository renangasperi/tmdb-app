import { ref } from "vue";
import { useToast } from "vue-toast-notification";

type Params = Record<string, string>;

const BASE_URL = "https://api.themoviedb.org/3/";

const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

function buildQueryParams(params: Params) {
  const query = new URLSearchParams(params).toString();
  return query;
}

export function useApi<T>() {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const $toast = useToast();

  const get = async (url: string, params?: Params): Promise<T | null> => {
    loading.value = true;

    const queryString = buildQueryParams({ ...params, language: "pt-br" });

    try {
      const response = await fetch(`${BASE_URL}${url}?${queryString}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: T = await response.json();

      data.value = responseData;
      error.value = null;

      return responseData;
    } catch (err) {
      $toast.open({
        message: "Falha ao realizar a requisição.",
        type: "error",
        duration: 2000,
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    get,
  };
}
