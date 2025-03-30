import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("There was a Problem Fetching Cabins");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name?.replaceAll(
    "/",
    ""
  )}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  console.log(hasImagePath, imagePath);
  let query = supabase.from("cabins");
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new error("failed to create cabin");
  }
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new error("failed to upload image and the was not created");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("failed to delete Cabin");
  }
  return data;
}
