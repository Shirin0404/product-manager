import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  formData: {
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: ""
  },
  errors: {},
  
  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    })),

  validate: () => {
    const { formData } = get();
    const errors = {};

    if (!formData.name.trim()) errors.name = "نام محصول الزامی است";
    if (!formData.price || formData.price <= 0)
      errors.price = "قیمت معتبر وارد کنید";
    if (formData.imageUrl && !formData.imageUrl.startsWith("http"))
      errors.imageUrl = "آدرس تصویر باید با http شروع شود";

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  resetForm: () =>
    set({
      formData: {
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: ""
      },
      errors: {}
    })
}));
