import supabase, { supabaseUrl } from "./supabase.js";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins API couldnt be loaded");
  }

  return data;
};

export async function createOrEditCabin(newCabin, editId) {
  const isEditSession = Boolean(editId);
  const hasImagePath = Boolean(typeof newCabin.image === "string");

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create or edit the cabin
  let query = supabase.from("cabins");
  const newImage = hasImagePath ? newCabin.image : imagePath;

  // if it is an edit session
  if (isEditSession)
    query = query.update({ ...newCabin, image: newImage }).eq("id", editId);
  // if it is a new session
  if (!isEditSession) query = query.insert([{ ...newCabin, image: newImage }]);

  // 1) Create or edit the cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(
      `Cabin could not be ${isEditSession ? "edited" : "created"}!`
    );
  }

  // 2) Upload the image if it isn't already uploaded
  if (hasImagePath) return data;

  const { error: errorImage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (errorImage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded");
  }

  return data;
}
export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
};
