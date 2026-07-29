// import api from "@/lib/axios";

// import { isAxiosError } from "axios";

// export async function navigation() {
//   try {
//     const url = "/home/navigation";
//     const { data } = await api.get(url);

//     const response = navigationSchema.safeParse(data);
//     if (!response.success) {
//       throw new Error("Error al cargar los datos");
//     }
//     return response.data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error || "Hubo un error");
//     }
//     throw new Error("Hubo un error inesperado");
//   }
// }
