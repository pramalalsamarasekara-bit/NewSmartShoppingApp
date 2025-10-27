import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import { useLanguage } from "../../contexts/LanguageContext";

const L = {
  en: {
    title: "Voice Product Search",
    hintIdle: "Tap the microphone to start speaking",
    hintListen: "Listening... Tap again to stop.",
    saidLabel: "You said:",
    featuresTitle: "Voice Features:",
    f1: "• Natural language product search",
    f2: "• Hands-free product discovery",
    f3: "• Multi-language voice recognition",
  },
  si: {
    title: "හඬ භාෂයෙන් භාණ්ඩ සෙවුම",
    hintIdle: "කතා කරනනම් මයික් එක ඔබන්න",
    hintListen: "කැඩින්නේ... නැවැත්වීමට නැවත ඔබන්න.",
    saidLabel: "ඔයා කිව්වේ:",
    featuresTitle: "හඬ විශේෂාංග:",
    f1: "• ස්වභාවික භාෂාවෙන් සෙවුම",
    f2: "• කයින් නොමැතිව සෙවුම",
    f3: "• බහු භාෂා හඳුනාගැනීම",
  },
  ar: {
    title: "بحث المنتجات بالصوت",
    hintIdle: "اضغط على الميكروفون لبدء التحدث",
    hintListen: "يستمع… اضغط مرة أخرى للإيقاف.",
    saidLabel: "قلت:",
    featuresTitle: "مزايا الصوت:",
    f1: "• بحث بُلغة طبيعية",
    f2: "• استكشاف دون استخدام اليدين",
    f3: "• تعرّف صوتي لعدة لغات",
  },
  ta: {
    title: "குரலால் பொருள் தேடல்",
    hintIdle: "பேச தொடங்க மைக் தொட்டு",
    hintListen: "கேட்கிறது… நிறுத்த மீண்டும் தொட்டு.",
    saidLabel: "நீங்கள் சொன்னது:",
    featuresTitle: "குரல் அம்சங்கள்:",
    f1: "• இயல்பான மொழி தேடல்",
    f2: "• கை இல்லாமல் கண்டுபிடித்தல்",
    f3: "• பல மொழி குரல் அடையாளம்",
  },
  hi: {
    title: "वॉइस से प्रोडक्ट खोज",
    hintIdle: "बोलना शुरू करने के लिए माइक्रोफोन दबाएँ",
    hintListen: "सुन रहा है… रोकने हेतु फिर दबाएँ.",
    saidLabel: "आपने कहा:",
    featuresTitle: "वॉइस विशेषताएँ:",
    f1: "• प्राकृतिक भाषा खोज",
    f2: "• हैंड्स-फ्री डिस्कवरी",
    f3: "• बहुभाषी वॉइस पहचान",
  },
  ur: {
    title: "آواز سے پراڈکٹ تلاش",
    hintIdle: "بولنا شروع کرنے کے لیے مائیک دبائیں",
    hintListen: "سن رہا ہے… روکنے کو دوبارہ دبائیں۔",
    saidLabel: "آپ نے کہا:",
    featuresTitle: "وائس خصوصیات:",
    f1: "• قدرتی زبان میں تلاش",
    f2: "• بغیر ہاتھ کے دریافت",
    f3: "• کثیر لسانی وائس پہچان",
  },
} as const;

export default function VoiceOrderScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLanguage();
  const Sx = L[lang] || L.en;

  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) setResult(e.value[0]);
      setIsListening(false);
    };
    Voice.onSpeechError = (e: any) => {
      setError(e.error?.message || "Voice recognition error");
      setIsListening(false);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    setError(null);
    setResult("");
    try {
      setIsListening(true);
      await Voice.start(lang === "ar" ? "ar-SA" : lang === "si" ? "si-LK" : lang === "hi" ? "hi-IN" : lang === "ur" ? "ur-PK" : lang === "ta" ? "ta-IN" : "en-US");
    } catch (e: any) {
      setError(e.message || "Could not start voice recognition");
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch {}
  };

  return (
    <View style={S.container}>
      <View style={[S.header, isRTL && { flexDirection: "row-reverse" }]}>
        <TouchableOpacity onPress={() => router.back()} style={S.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[S.headerTitle, isRTL && { textAlign: "right" }]}>{t("voiceOrder")}</Text>
      </View>

      <Text style={[S.title, isRTL && { textAlign: "right" }]}>{Sx.title}</Text>

      <TouchableOpacity
        style={[S.micWrap, isListening && { opacity: 0.6 }]}
        onPress={isListening ? stopListening : startListening}
        activeOpacity={0.75}
        disabled={isListening}
      >
        <View style={S.micCircle}>
          <MaterialCommunityIcons
            name={isListening ? "microphone" : "microphone-outline"}
            size={54}
            color={isListening ? "#e74c3c" : "#3498fa"}
          />
          {isListening && <ActivityIndicator color="#e74c3c" style={{ position: "absolute", bottom: 6, right: 6 }} />}
        </View>
      </TouchableOpacity>

      <Text style={[S.tapToSpeak, isRTL && { textAlign: "right" }]}>
        {isListening ? Sx.hintListen : Sx.hintIdle}
      </Text>

      {result ? (
        <View style={S.resultBox}>
          <Text style={[S.resultLabel, isRTL && { textAlign: "right", alignSelf: "flex-end" }]}>{Sx.saidLabel}</Text>
          <Text style={[S.result, isRTL && { textAlign: "right" }]}>{result}</Text>
        </View>
      ) : null}

      {error ? <Text style={{ color: "#e74c3c", marginBottom: 10, textAlign: "center" }}>{error}</Text> : null}

      <View style={S.featuresBox}>
        <Text style={[S.featuresTitle, isRTL && { textAlign: "right" }]}>{Sx.featuresTitle}</Text>
        <Text style={[S.feature, isRTL && { textAlign: "right" }]}>{Sx.f1}</Text>
        <Text style={[S.feature, isRTL && { textAlign: "right" }]}>{Sx.f2}</Text>
        <Text style={[S.feature, isRTL && { textAlign: "right" }]}>{Sx.f3}</Text>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 22, paddingTop: 36, alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", alignSelf: "stretch", marginBottom: 18 },
  backBtn: { padding: 4, marginRight: 4 },
  headerTitle: { fontSize: 20, fontWeight: "600", marginLeft: 4, color: "#222", flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", color: "#223", marginBottom: 12, textAlign: "center" },
  micWrap: { alignItems: "center", marginBottom: 10, width: "100%" },
  micCircle: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: "#eaf3fa",
    alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#c8e2fa", position: "relative"
  },
  tapToSpeak: { color: "#3446a3", fontSize: 15, fontWeight: "600", textAlign: "center", marginBottom: 18 },
  resultBox: { backgroundColor: "#f6f9ff", borderRadius: 8, padding: 12, marginBottom: 12, alignSelf: "stretch", alignItems: "stretch", borderColor: "#b3d4fc", borderWidth: 1 },
  resultLabel: { color: "#888", fontSize: 13, fontWeight: "600", marginBottom: 2 },
  result: { fontSize: 18, color: "#222", fontWeight: "bold" },
  featuresBox: { backgroundColor: "#f7fafd", borderRadius: 12, padding: 18, width: "100%", marginTop: 10, marginBottom: 10,
    shadowColor: "#1a1a1a", shadowOpacity: 0.04, shadowRadius: 7, shadowOffset: { width: 0, height: 4 } },
  featuresTitle: { fontWeight: "bold", marginBottom: 8, color: "#222", fontSize: 15 },
  feature: { color: "#223", fontSize: 15, marginBottom: 3 },
});
