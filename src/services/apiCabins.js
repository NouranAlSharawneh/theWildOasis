import supabase, { supabaseUrl } from "./supabase.js";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins API couldnt be loaded");
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  console.log(newCabin, id);
  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/ Edit the cabin
  let query = supabase.from("cabins");

  // a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) update
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Create the cabin image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if an error occurs when uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    throw new Error(
      "Image could not be uploaded and the cabin was not created"
    );
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
};
