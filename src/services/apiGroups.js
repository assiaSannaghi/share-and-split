import supabase from "./supabase";

export async function getGroups() {
  const { data, error } = await supabase.from("groups").select("*");

  if (error) {
    console.error(error);
    throw new Error("Groups could not be loaded");
  }

  return data;
}

export async function deteleGroup(id) {
  const { data, error } = await supabase.from("groups").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Group could not be deleted");
  }

  return data;
}

export async function createGroup(newGroup) {
  const { data, error } = await supabase
    .from("groups")
    .insert([newGroup])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Group could not be created");
  }

  return data;
}

export async function updateGroup({ id, updatedGroup }) {
  const { data, error } = await supabase
    .from("groups")
    .update(updatedGroup)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Group could not be updated");
  }

  return data;
}
