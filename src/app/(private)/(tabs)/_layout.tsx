import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="recipes" options={{ headerShown: false }} />
      <Tabs.Screen name="createrecipes" options={{ headerShown: false }} />
    </Tabs>
  );
}
