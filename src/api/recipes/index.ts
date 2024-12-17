import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      if (!data.userId) {
        throw new Error("Id do usuário é obrigatório para criar receita");
      }

      const { data: newRecipe, error } = await supabase
        .from("recipes")
        .insert({
          name: data.name,
          preptime: data.preptime,
          ingredients: data.ingredients,
          desc: data.desc,
          image: data.image,
          user_id: data.userId,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newRecipe;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useRecipeList = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipes").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useEditRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: updateRecipe, error } = await supabase
        .from("recipes")
        .update({
          name: data.name,
          preptime: data.preptime,
          ingredients: data.ingredients,
          desc: data.desc,
          image: data.image,
          user_id: data.userId,
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return updateRecipe;
    },

    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["recipes", id] });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from("recipes").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
