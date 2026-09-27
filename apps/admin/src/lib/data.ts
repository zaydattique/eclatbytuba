import {
  getProducts,
  getCategories,
  getOrders,
  getOrderById,
  updateOrderStatus,
  createProduct,
  updateProduct,
  getProductById,
  getAllProductImages,
  getDashboardStats,
} from "@eclat/db";

export async function getAdminProducts() {
  return getProducts({ activeOnly: false });
}

export {
  getProducts,
  getCategories,
  getOrders,
  getOrderById,
  updateOrderStatus,
  createProduct,
  updateProduct,
  getProductById,
  getAllProductImages,
  getDashboardStats,
};
