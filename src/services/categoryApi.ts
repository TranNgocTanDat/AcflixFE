
import Category from "../model/Category";
import CategoryDetails from "../model/CategoryDetails";
import { Film } from "../model/Film";
import { Page } from "../model/Page";
import api from "./api";

export const findCategoryDetails = async (limit: number, offset = 0) => {
  return await api.get<CategoryDetails[]>("/browse/categories", { params: { limit, offset } });
};

export const findCategory = async (limit: number, offset = 0, sort = 0) => {
  return await api.get<Page<Category>>("/categories", { params: { limit, offset, sort } });
}

export const findCategoryById = async (id: string, limit: number, offset = 0, sort ="") => {
  return await api.get<Page<Film>>(`/category/${id}/films`, { params: { limit, offset, sort } });
}

