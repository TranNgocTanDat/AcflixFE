import CategoryDetails from "../model/CategoryDetails";
import api from "./api";

export const findCategoryDetails = async (limit: number, offset = 0) => {
  return await api.get<CategoryDetails[]>("/browse/categories", { params: { limit, offset } });
};

