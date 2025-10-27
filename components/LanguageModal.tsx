import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

// ✅ FLAGS type + commas correct + 'ta' included
const FLAGS: Record<'en' | 'si' | 'ar' | 'hi' | 'zh' | 'ta', string> = {
  en: '🇬🇧',
  si: '🇱🇰',
  ar: '🇸🇦',
  hi: '🇮🇳',
  zh: '🇨🇳',
  ta: '🇮🇳', // or '🇱🇰' — your choice
};

export default function LanguageModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { languages, setLang } = useLanguage();

  const pick = async (key: any) => {
    await setLang(key);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.card}>
          <Text style={s.title}>Select Language</Text>

          <View style={{ gap: 10 }}>
            {languages.map(l => (
              <TouchableOpacity
                key={l.key}
                onPress={() => pick(l.key)}
                style={s.row}
                activeOpacity={0.85}
              >
                <Text style={s.flag}>{FLAGS[l.key] ?? '🌐'}</Text>
                <Text style={s.langName}>{l.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={onClose} style={s.closeBtn}>
            <Text style={s.closeTxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  flag: { fontSize: 22 },
  langName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  closeBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
  },
  closeTxt: { fontWeight: '700' },
});
