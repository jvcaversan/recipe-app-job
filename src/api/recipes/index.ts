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
