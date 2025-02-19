import supabase from "./supabase";

export async function getActivities() {
  const { data, error } = await supabase.from("activities").select("*");

  if (error) {
    console.error(error);
    throw new Error("Activity could not be loaded");
  }

  return data;
}

export async function createActivity(newActivity) {
  const { data, error } = await supabase
    .from("activities")
    .insert([newActivity])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Activity could not be created");
  }

  return data;
}

// export async function deteleActivity(id) {
//   const { data, error } = await supabase.from("activities").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Activity could not be deleted");
//   }

//   return data;
// }
