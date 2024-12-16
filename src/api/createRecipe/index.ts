import { StyleSheetProperties } from "./../../../node_modules/@types/react-native/index.d";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      if (!data.userId) {
        throw new Error("Id do usuário é obrigatório para criar receita");
      }

      const { error, data: newRecipe } = await supabase
        .from("recipes")
        .insert({
          name: data.name,
          preptime: data.preptime,
          ingredients: data.ingredients,
          desc: data.steps,
          image: data.image,
          user_id: data.userId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newRecipe;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
