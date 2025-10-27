// app/(tabs)/cart.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useCartStore } from "../../lib/cartStore";

export default function CartTab() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total);

  const pasteToCart = async () => {
    try {
      const str = await Clipboard.getStringAsync();
      const raw = (str || "").trim();
      if (!raw) {
        Alert.alert("Paste to Cart", "Clipboard is empty.");
        return;
      }
      // Split by comma OR newline
      const parts = raw.split(/[\n,]+/).map((p) => p.trim()).filter(Boolean);
      if (parts.length === 0) {
        Alert.alert("Paste to Cart", "Nothing to add.");
        return;
      }
      parts.forEach((title, i) => {
        addItem({ id: `PASTE-${Date.now()}-${i}`, title }); // price optional
      });
      Alert.alert("Added", `Added ${parts.length} item(s) from clipboard.`);
    } catch (e: any) {
      Alert.alert("Paste failed", e?.message ?? "Unknown error");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>

     <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" }}>My Cart</Text>
      {/* Actions */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        <TouchableOpacity
          onPress={pasteToCart}
          style={{ backgroundColor: "#16a34a", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Paste to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clear}
          style={{ backgroundColor: "#0ea5e9", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Clear Cart</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <Text style={{ color: "#64748b" }}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                  backgroundColor: "#f2f2f2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  {/** optional image */}
                  { (item as any).image && (
                    <Image
                      source={{ uri: (item as any).image }}
                      style={{ width: 40, height: 40, borderRadius: 6, marginRight: 10 }}
                    />
                  )}
                  <Text style={{ fontWeight: "600" }} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Text style={{ color: "red", fontWeight: "700" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={{ marginTop: 8, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 16, fontWeight: "800" }}>
              Total: ${total().toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
