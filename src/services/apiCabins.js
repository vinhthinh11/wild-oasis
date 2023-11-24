import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error.message);
    throw new Error('Cabins could not be loaded');
  }
  return cabins;
}
export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('Could not delete the cabin');
  }
  return data;
}
export async function addEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from('cabins');
  // This for create new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // this for Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    throw new Error(
      id ? 'Could not update the cabin' : 'Could not add new cabin'
    );
  }
  // upload image to supabase bucket
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  //when there is an upload error then move the canbin just uploaded
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Could not upload the image');
  }
  return data;
}
export const getUrlOfCabin = async function () {
  const { data } = supabase.storage.from('cabin-images').getPublicUrl();
  console.log(data);
  // const { data, error } = await supabase.storage.getBucket('cabin-images');
  // console.log(data);
};
