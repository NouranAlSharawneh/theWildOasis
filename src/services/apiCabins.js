import supabase from "./supabase.js";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins API couldnt be loaded");
  }

  return data;
};
