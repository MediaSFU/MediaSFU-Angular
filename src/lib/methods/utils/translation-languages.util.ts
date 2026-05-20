/**
 * Central Language Definitions for Translation Pipeline (Frontend)
 * 
 * This module provides a single source of truth for all supported languages,
 * language codes, and voice configurations across the frontend application.
 * 
 * Language Code Standards:
 * - ISO 639-1: 2-letter codes (e.g., 'en', 'es') - PRIMARY STANDARD
 * - ISO 639-2: 3-letter codes (e.g., 'eng', 'spa') - for extended languages
 * - BCP 47: Language tags with regions (e.g., 'en-US', 'pt-BR')
 */

import {
  SUPPORTED_LANGUAGE_CODES as SHARED_SUPPORTED_LANGUAGE_CODES,
  getLanguageMetadata as sharedGetLanguageMetadata,
  getLanguageName as sharedGetLanguageName,
  getLanguageNativeName as sharedGetLanguageNativeName,
  getSupportedLanguages as sharedGetSupportedLanguages,
  isLanguageSupported as sharedIsLanguageSupported,
  normalizeLanguageCode as sharedNormalizeLanguageCode,
} from 'mediasfu-shared';

// ============================================================================
// TYPES
// ============================================================================

export type VoiceGender = 'male' | 'female' | 'neutral';

export type TTSSupport = 'excellent' | 'good' | 'moderate' | 'limited' | 'unknown' | 'n/a';

export type LanguageRegion = 
  | 'global' | 'europe' | 'asia' | 'south-asia' | 'mena' 
  | 'africa' | 'caucasus' | 'central-asia' | 'constructed' | 'special' | 'other';

export interface LanguageMetadata {
  name: string;
  nativeName: string;
  region: LanguageRegion;
  ttsSupport: TTSSupport;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  ttsSupport: TTSSupport;
  region: LanguageRegion;
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: VoiceGender;
  provider: string;
  language: string;
  style?: string;
}

export interface VoiceSelectionPreference {
  gender: VoiceGender;
  voiceId?: string; // Specific voice ID (advanced mode)
  style?: string;   // Voice style (e.g., 'cheerful', 'professional')
}

/**
 * Voice configuration for translation
 * Used in translation:subscribe and per-language voice settings
 */
export interface TranslationVoiceConfig {
  // Basic Mode: Gender preference (simple selection)
  voiceGender?: VoiceGender;
  
  // Advanced Mode: Explicit voice ID from provider
  voiceId?: string;
  
  // Voice Cloning (future feature)
  voiceClone?: {
    provider: 'elevenlabs' | 'playht' | 'coqui';
    voiceId: string;
    stability?: number;  // 0-1, ElevenLabs
    similarity?: number; // 0-1, ElevenLabs
  };
  
  // Pipeline nicknames (for custom STT/LLM/TTS providers)
  sttNickName?: string;
  llmNickName?: string;
  ttsNickName?: string;
  
  // Pipeline params (provider-specific settings)
  sttParams?: Record<string, string | number | boolean>;
  llmParams?: Record<string, string | number | boolean>;
  ttsParams?: Record<string, string | number | boolean>;
}

/**
 * Language entry with voice config override
 */
export interface TranslationLanguageEntry {
  code: string;        // ISO 639-1 code
  nickname?: string;   // Display name override
  voiceConfig?: TranslationVoiceConfig; // Per-language voice settings
}

// ============================================================================
// LANGUAGE DEFINITIONS
// ============================================================================

/**
 * Complete list of supported language codes (ISO 639-1 primarily)
 */
export const SUPPORTED_LANGUAGE_CODES: string[] = [...SHARED_SUPPORTED_LANGUAGE_CODES];

/**
 * Language metadata with display names and additional info
 */
export const LANGUAGE_METADATA: Record<string, LanguageMetadata> = {
  // Major World Languages
  'en': { name: 'English', nativeName: 'English', region: 'global', ttsSupport: 'excellent' },
  'es': { name: 'Spanish', nativeName: 'Español', region: 'global', ttsSupport: 'excellent' },
  'fr': { name: 'French', nativeName: 'Français', region: 'europe', ttsSupport: 'excellent' },
  'de': { name: 'German', nativeName: 'Deutsch', region: 'europe', ttsSupport: 'excellent' },
  'it': { name: 'Italian', nativeName: 'Italiano', region: 'europe', ttsSupport: 'excellent' },
  'pt': { name: 'Portuguese', nativeName: 'Português', region: 'global', ttsSupport: 'excellent' },
  'ru': { name: 'Russian', nativeName: 'Русский', region: 'europe', ttsSupport: 'excellent' },
  'zh': { name: 'Chinese', nativeName: '中文', region: 'asia', ttsSupport: 'excellent' },
  'ja': { name: 'Japanese', nativeName: '日本語', region: 'asia', ttsSupport: 'excellent' },
  'ko': { name: 'Korean', nativeName: '한국어', region: 'asia', ttsSupport: 'excellent' },
  'ar': { name: 'Arabic', nativeName: 'العربية', region: 'mena', ttsSupport: 'excellent' },

  // South Asian Languages
  'hi': { name: 'Hindi', nativeName: 'हिन्दी', region: 'south-asia', ttsSupport: 'good' },
  'bn': { name: 'Bengali', nativeName: 'বাংলা', region: 'south-asia', ttsSupport: 'good' },
  'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'south-asia', ttsSupport: 'moderate' },
  'te': { name: 'Telugu', nativeName: 'తెలుగు', region: 'south-asia', ttsSupport: 'good' },
  'mr': { name: 'Marathi', nativeName: 'मराठी', region: 'south-asia', ttsSupport: 'good' },
  'ta': { name: 'Tamil', nativeName: 'தமிழ்', region: 'south-asia', ttsSupport: 'good' },
  'ur': { name: 'Urdu', nativeName: 'اردو', region: 'south-asia', ttsSupport: 'good' },
  'gu': { name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'south-asia', ttsSupport: 'moderate' },
  'kn': { name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'south-asia', ttsSupport: 'moderate' },
  'ml': { name: 'Malayalam', nativeName: 'മലയാളം', region: 'south-asia', ttsSupport: 'moderate' },
  'ne': { name: 'Nepali', nativeName: 'नेपाली', region: 'south-asia', ttsSupport: 'limited' },
  'si': { name: 'Sinhala', nativeName: 'සිංහල', region: 'south-asia', ttsSupport: 'limited' },

  // European Languages
  'nl': { name: 'Dutch', nativeName: 'Nederlands', region: 'europe', ttsSupport: 'excellent' },
  'pl': { name: 'Polish', nativeName: 'Polski', region: 'europe', ttsSupport: 'excellent' },
  'tr': { name: 'Turkish', nativeName: 'Türkçe', region: 'europe', ttsSupport: 'excellent' },
  'cs': { name: 'Czech', nativeName: 'Čeština', region: 'europe', ttsSupport: 'good' },
  'el': { name: 'Greek', nativeName: 'Ελληνικά', region: 'europe', ttsSupport: 'good' },
  'hu': { name: 'Hungarian', nativeName: 'Magyar', region: 'europe', ttsSupport: 'good' },
  'ro': { name: 'Romanian', nativeName: 'Română', region: 'europe', ttsSupport: 'good' },
  'sv': { name: 'Swedish', nativeName: 'Svenska', region: 'europe', ttsSupport: 'excellent' },
  'da': { name: 'Danish', nativeName: 'Dansk', region: 'europe', ttsSupport: 'good' },
  'fi': { name: 'Finnish', nativeName: 'Suomi', region: 'europe', ttsSupport: 'good' },
  'no': { name: 'Norwegian', nativeName: 'Norsk', region: 'europe', ttsSupport: 'good' },
  'sk': { name: 'Slovak', nativeName: 'Slovenčina', region: 'europe', ttsSupport: 'moderate' },
  'uk': { name: 'Ukrainian', nativeName: 'Українська', region: 'europe', ttsSupport: 'good' },
  'bg': { name: 'Bulgarian', nativeName: 'Български', region: 'europe', ttsSupport: 'moderate' },
  'hr': { name: 'Croatian', nativeName: 'Hrvatski', region: 'europe', ttsSupport: 'moderate' },
  'et': { name: 'Estonian', nativeName: 'Eesti', region: 'europe', ttsSupport: 'moderate' },
  'lt': { name: 'Lithuanian', nativeName: 'Lietuvių', region: 'europe', ttsSupport: 'moderate' },
  'lv': { name: 'Latvian', nativeName: 'Latviešu', region: 'europe', ttsSupport: 'moderate' },
  'sl': { name: 'Slovenian', nativeName: 'Slovenščina', region: 'europe', ttsSupport: 'moderate' },
  'sr': { name: 'Serbian', nativeName: 'Српски', region: 'europe', ttsSupport: 'moderate' },
  'bs': { name: 'Bosnian', nativeName: 'Bosanski', region: 'europe', ttsSupport: 'limited' },
  'mk': { name: 'Macedonian', nativeName: 'Македонски', region: 'europe', ttsSupport: 'limited' },
  'is': { name: 'Icelandic', nativeName: 'Íslenska', region: 'europe', ttsSupport: 'moderate' },
  'ga': { name: 'Irish', nativeName: 'Gaeilge', region: 'europe', ttsSupport: 'limited' },
  'cy': { name: 'Welsh', nativeName: 'Cymraeg', region: 'europe', ttsSupport: 'moderate' },
  'mt': { name: 'Maltese', nativeName: 'Malti', region: 'europe', ttsSupport: 'limited' },
  'lb': { name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', region: 'europe', ttsSupport: 'limited' },
  'sq': { name: 'Albanian', nativeName: 'Shqip', region: 'europe', ttsSupport: 'limited' },
  'be': { name: 'Belarusian', nativeName: 'Беларуская', region: 'europe', ttsSupport: 'limited' },

  // Middle Eastern Languages
  'he': { name: 'Hebrew', nativeName: 'עברית', region: 'mena', ttsSupport: 'good' },
  'fa': { name: 'Persian', nativeName: 'فارسی', region: 'mena', ttsSupport: 'moderate' },
  'ps': { name: 'Pashto', nativeName: 'پښتو', region: 'mena', ttsSupport: 'limited' },
  'ku': { name: 'Kurdish', nativeName: 'Kurdî', region: 'mena', ttsSupport: 'limited' },

  // Southeast Asian Languages
  'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'asia', ttsSupport: 'good' },
  'th': { name: 'Thai', nativeName: 'ไทย', region: 'asia', ttsSupport: 'good' },
  'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'asia', ttsSupport: 'good' },
  'ms': { name: 'Malay', nativeName: 'Bahasa Melayu', region: 'asia', ttsSupport: 'good' },
  'tl': { name: 'Filipino', nativeName: 'Tagalog', region: 'asia', ttsSupport: 'moderate' },
  'km': { name: 'Khmer', nativeName: 'ខ្មែរ', region: 'asia', ttsSupport: 'limited' },
  'lo': { name: 'Lao', nativeName: 'ລາວ', region: 'asia', ttsSupport: 'limited' },
  'my': { name: 'Burmese', nativeName: 'မြန်မာစာ', region: 'asia', ttsSupport: 'limited' },

  // African Languages
  'sw': { name: 'Swahili', nativeName: 'Kiswahili', region: 'africa', ttsSupport: 'moderate' },
  'yo': { name: 'Yoruba', nativeName: 'Yorùbá', region: 'africa', ttsSupport: 'limited' },
  'ig': { name: 'Igbo', nativeName: 'Igbo', region: 'africa', ttsSupport: 'limited' },
  'ha': { name: 'Hausa', nativeName: 'Hausa', region: 'africa', ttsSupport: 'limited' },
  'zu': { name: 'Zulu', nativeName: 'isiZulu', region: 'africa', ttsSupport: 'moderate' },
  'xh': { name: 'Xhosa', nativeName: 'isiXhosa', region: 'africa', ttsSupport: 'limited' },
  'af': { name: 'Afrikaans', nativeName: 'Afrikaans', region: 'africa', ttsSupport: 'good' },
  'st': { name: 'Sesotho', nativeName: 'Sesotho', region: 'africa', ttsSupport: 'limited' },
  'tn': { name: 'Setswana', nativeName: 'Setswana', region: 'africa', ttsSupport: 'limited' },
  'sn': { name: 'Shona', nativeName: 'chiShona', region: 'africa', ttsSupport: 'limited' },
  'am': { name: 'Amharic', nativeName: 'አማርኛ', region: 'africa', ttsSupport: 'moderate' },
  'so': { name: 'Somali', nativeName: 'Soomaali', region: 'africa', ttsSupport: 'limited' },
  'rw': { name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', region: 'africa', ttsSupport: 'limited' },
  'mg': { name: 'Malagasy', nativeName: 'Malagasy', region: 'africa', ttsSupport: 'limited' },
  'ny': { name: 'Chichewa', nativeName: 'Chichewa', region: 'africa', ttsSupport: 'limited' },
  'ee': { name: 'Ewe', nativeName: 'Eʋegbe', region: 'africa', ttsSupport: 'limited' },
  'tw': { name: 'Twi', nativeName: 'Twi', region: 'africa', ttsSupport: 'limited' },
  'gaa': { name: 'Ga', nativeName: 'Gã', region: 'africa', ttsSupport: 'limited' },

  // Caucasian Languages
  'ka': { name: 'Georgian', nativeName: 'ქართული', region: 'caucasus', ttsSupport: 'moderate' },
  'hy': { name: 'Armenian', nativeName: 'Հայերեն', region: 'caucasus', ttsSupport: 'moderate' },
  'az': { name: 'Azerbaijani', nativeName: 'Azərbaycanca', region: 'caucasus', ttsSupport: 'moderate' },

  // Regional European Languages
  'eu': { name: 'Basque', nativeName: 'Euskara', region: 'europe', ttsSupport: 'limited' },
  'gl': { name: 'Galician', nativeName: 'Galego', region: 'europe', ttsSupport: 'moderate' },
  'ca': { name: 'Catalan', nativeName: 'Català', region: 'europe', ttsSupport: 'good' },
  'la': { name: 'Latin', nativeName: 'Latina', region: 'europe', ttsSupport: 'limited' },
  'eo': { name: 'Esperanto', nativeName: 'Esperanto', region: 'constructed', ttsSupport: 'limited' },

  // Central Asian
  'kk': { name: 'Kazakh', nativeName: 'Қазақша', region: 'central-asia', ttsSupport: 'moderate' },
  'uz': { name: 'Uzbek', nativeName: "O'zbek", region: 'central-asia', ttsSupport: 'moderate' },
  'tg': { name: 'Tajik', nativeName: 'Тоҷикӣ', region: 'central-asia', ttsSupport: 'limited' },
  'ky': { name: 'Kyrgyz', nativeName: 'Кыргызча', region: 'central-asia', ttsSupport: 'limited' },
  'tk': { name: 'Turkmen', nativeName: 'Türkmen', region: 'central-asia', ttsSupport: 'limited' },
  'mn': { name: 'Mongolian', nativeName: 'Монгол', region: 'central-asia', ttsSupport: 'moderate' },

  // Special
  'auto': { name: 'Auto-detect', nativeName: 'Auto', region: 'special', ttsSupport: 'n/a' },
};

// ============================================================================
// VOICE DEFINITIONS
// ============================================================================

export const VOICE_GENDERS: Record<string, VoiceGender> = {
  MALE: 'male',
  FEMALE: 'female',
  NEUTRAL: 'neutral',
};

/**
 * Default voice gender per language
 */
export const DEFAULT_VOICE_GENDERS: Record<string, VoiceGender> = {
  'en': 'female',
  'es': 'female',
  'fr': 'female',
  'de': 'male',
  'it': 'female',
  'pt': 'female',
  'ru': 'female',
  'zh': 'female',
  'ja': 'female',
  'ko': 'female',
  'ar': 'male',
};

/**
 * Azure Neural Voice mappings by language and gender
 */
export const AZURE_NEURAL_VOICES: Record<string, { male: string[]; female: string[] }> = {
  'en': {
    male: ['en-US-GuyNeural', 'en-US-DavisNeural', 'en-GB-RyanNeural'],
    female: ['en-US-JennyNeural', 'en-US-AriaNeural', 'en-GB-SoniaNeural'],
  },
  'es': {
    male: ['es-ES-AlvaroNeural', 'es-MX-JorgeNeural'],
    female: ['es-ES-ElviraNeural', 'es-MX-DaliaNeural'],
  },
  'fr': {
    male: ['fr-FR-HenriNeural', 'fr-CA-AntoineNeural'],
    female: ['fr-FR-DeniseNeural', 'fr-CA-SylvieNeural'],
  },
  'de': {
    male: ['de-DE-ConradNeural', 'de-DE-KillianNeural'],
    female: ['de-DE-KatjaNeural', 'de-DE-AmalaNeural'],
  },
  'it': {
    male: ['it-IT-DiegoNeural', 'it-IT-GiuseppeNeural'],
    female: ['it-IT-ElsaNeural', 'it-IT-IsabellaNeural'],
  },
  'pt': {
    male: ['pt-BR-AntonioNeural', 'pt-PT-DuarteNeural'],
    female: ['pt-BR-FranciscaNeural', 'pt-PT-RaquelNeural'],
  },
  'ru': {
    male: ['ru-RU-DmitryNeural'],
    female: ['ru-RU-SvetlanaNeural', 'ru-RU-DariyaNeural'],
  },
  'zh': {
    male: ['zh-CN-YunxiNeural', 'zh-CN-YunjianNeural'],
    female: ['zh-CN-XiaoxiaoNeural', 'zh-CN-XiaoyiNeural'],
  },
  'ja': {
    male: ['ja-JP-KeitaNeural'],
    female: ['ja-JP-NanamiNeural', 'ja-JP-AoiNeural'],
  },
  'ko': {
    male: ['ko-KR-InJoonNeural'],
    female: ['ko-KR-SunHiNeural', 'ko-KR-JiMinNeural'],
  },
  'ar': {
    male: ['ar-SA-HamedNeural', 'ar-EG-ShakirNeural'],
    female: ['ar-SA-ZariyahNeural', 'ar-EG-SalmaNeural'],
  },
  'hi': {
    male: ['hi-IN-MadhurNeural'],
    female: ['hi-IN-SwaraNeural'],
  },
};

/**
 * Google Cloud TTS voice mappings
 */
export const GOOGLE_VOICES: Record<string, { male: string[]; female: string[] }> = {
  'en': {
    male: ['en-US-Neural2-D', 'en-US-Neural2-J', 'en-GB-Neural2-B'],
    female: ['en-US-Neural2-C', 'en-US-Neural2-F', 'en-GB-Neural2-A'],
  },
  'es': {
    male: ['es-ES-Neural2-B', 'es-US-Neural2-B'],
    female: ['es-ES-Neural2-A', 'es-US-Neural2-A'],
  },
  'fr': {
    male: ['fr-FR-Neural2-B', 'fr-FR-Neural2-D'],
    female: ['fr-FR-Neural2-A', 'fr-FR-Neural2-C'],
  },
  'de': {
    male: ['de-DE-Neural2-B', 'de-DE-Neural2-D'],
    female: ['de-DE-Neural2-A', 'de-DE-Neural2-C'],
  },
  'ja': {
    male: ['ja-JP-Neural2-C', 'ja-JP-Neural2-D'],
    female: ['ja-JP-Neural2-B'],
  },
  'ko': {
    male: ['ko-KR-Neural2-C'],
    female: ['ko-KR-Neural2-A', 'ko-KR-Neural2-B'],
  },
  'zh': {
    male: ['cmn-CN-Neural2-C', 'cmn-CN-Neural2-D'],
    female: ['cmn-CN-Neural2-A', 'cmn-CN-Neural2-B'],
  },
};

/**
 * AWS Polly voice mappings
 */
export const AWS_POLLY_VOICES: Record<string, { male: string[]; female: string[]; neural?: { male: string[]; female: string[] } }> = {
  'en': {
    male: ['Matthew', 'Joey', 'Stephen'],
    female: ['Joanna', 'Salli', 'Kendra', 'Ivy'],
    neural: { male: ['Matthew'], female: ['Joanna', 'Salli'] },
  },
  'es': {
    male: ['Miguel', 'Enrique'],
    female: ['Penelope', 'Lucia', 'Lupe'],
    neural: { male: ['Sergio'], female: ['Lucia', 'Lupe'] },
  },
  'fr': {
    male: ['Mathieu'],
    female: ['Celine', 'Lea'],
    neural: { male: [], female: ['Lea'] },
  },
  'de': {
    male: ['Hans'],
    female: ['Marlene', 'Vicki'],
    neural: { male: ['Daniel'], female: ['Vicki'] },
  },
  'ja': {
    male: ['Takumi'],
    female: ['Mizuki'],
    neural: { male: ['Takumi'], female: ['Kazuha'] },
  },
};

/**
 * Deepgram Aura voice mappings (multilingual)
 */
export interface DeepgramVoice {
  id: string;
  name: string;
}

export const DEEPGRAM_VOICES: { premade: { male: DeepgramVoice[]; female: DeepgramVoice[] } } = {
  premade: {
    male: [
      { id: 'aura-orion-en', name: 'Orion' },
      { id: 'aura-arcas-en', name: 'Arcas' },
      { id: 'aura-perseus-en', name: 'Perseus' },
      { id: 'aura-angus-en', name: 'Angus' },
      { id: 'aura-orpheus-en', name: 'Orpheus' },
      { id: 'aura-helios-en', name: 'Helios' },
      { id: 'aura-zeus-en', name: 'Zeus' },
    ],
    female: [
      { id: 'aura-asteria-en', name: 'Asteria' },
      { id: 'aura-luna-en', name: 'Luna' },
      { id: 'aura-stella-en', name: 'Stella' },
      { id: 'aura-athena-en', name: 'Athena' },
      { id: 'aura-hera-en', name: 'Hera' },
    ],
  },
};

/**
 * OpenAI TTS voice mappings (multilingual)
 */
export interface OpenAIVoice {
  id: string;
  name: string;
}

export const OPENAI_VOICES: { premade: { male: OpenAIVoice[]; female: OpenAIVoice[] } } = {
  premade: {
    male: [
      { id: 'onyx', name: 'Onyx' },
      { id: 'echo', name: 'Echo' },
      { id: 'fable', name: 'Fable' },
    ],
    female: [
      { id: 'alloy', name: 'Alloy' },
      { id: 'nova', name: 'Nova' },
      { id: 'shimmer', name: 'Shimmer' },
    ],
  },
};

/**
 * ElevenLabs pre-made voices (multilingual)
 */
export interface ElevenLabsVoice {
  id: string;
  name: string;
}

export const ELEVENLABS_VOICES: { premade: { male: ElevenLabsVoice[]; female: ElevenLabsVoice[] } } = {
  premade: {
    male: [
      { id: '29vD33N1CtxCmqQRPOHJ', name: 'Drew' },
      { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh' },
      { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold' },
      { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
    ],
    female: [
      { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
      { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
      { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli' },
      { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte' },
    ],
  },
};

/**
 * Cartesia Sonic voice mappings
 */
export interface CartesiaVoice {
  id: string;
  name: string;
}

export const CARTESIA_VOICES: { premade: { male: CartesiaVoice[]; female: CartesiaVoice[] } } = {
  premade: {
    male: [
      { id: 'a0e99841-438c-4a64-b679-ae501e7d6091', name: 'Barbershop Man' },
      { id: '79a125e8-cd45-4c13-8a67-188112f4dd22', name: 'British Customer Support' },
    ],
    female: [
      { id: '248be419-c632-4f23-adf1-5324ed7dbf1d', name: 'British Lady' },
      { id: 'c2ac25f9-ecc4-4f56-9095-651354df60c0', name: 'California Girl' },
    ],
  },
};

/**
 * Rime AI TTS voice mappings
 * Documentation: https://rime.ai/docs/voices
 */
export interface RimeVoice {
  id: string;
  name: string;
}

export const RIME_VOICES: { premade: { male: RimeVoice[]; female: RimeVoice[] } } = {
  premade: {
    male: [
      { id: 'mist', name: 'Mist' },
      { id: 'grove', name: 'Grove' },
      { id: 'bay', name: 'Bay' },
      { id: 'cove', name: 'Cove' },
    ],
    female: [
      { id: 'lagoon', name: 'Lagoon' },
      { id: 'marsh', name: 'Marsh' },
      { id: 'meadow', name: 'Meadow' },
      { id: 'brook', name: 'Brook' },
    ],
  },
};

/**
 * Kokoro TTS voice mappings (via Hugging Face)
 * Open-source multilingual TTS
 */
export interface KokoroVoice {
  id: string;
  name: string;
}

export const KOKORO_VOICES: { premade: { male: KokoroVoice[]; female: KokoroVoice[] } } = {
  premade: {
    male: [
      { id: 'af_sky', name: 'Sky (American)' },
      { id: 'am_adam', name: 'Adam (American)' },
      { id: 'bm_george', name: 'George (British)' },
    ],
    female: [
      { id: 'af_bella', name: 'Bella (American)' },
      { id: 'af_nicole', name: 'Nicole (American)' },
      { id: 'bf_emma', name: 'Emma (British)' },
      { id: 'af_sarah', name: 'Sarah (American)' },
    ],
  },
};

/**
 * Google Gemini TTS voice mappings
 */
export interface GeminiVoice {
  id: string;
  name: string;
}

export const GEMINI_VOICES: { premade: { male: GeminiVoice[]; female: GeminiVoice[] } } = {
  premade: {
    male: [
      { id: 'Puck', name: 'Puck' },
      { id: 'Charon', name: 'Charon' },
      { id: 'Kore', name: 'Kore' },
      { id: 'Fenrir', name: 'Fenrir' },
    ],
    female: [
      { id: 'Aoede', name: 'Aoede' },
      { id: 'Zephyr', name: 'Zephyr' },
    ],
  },
};

/**
 * Supported TTS providers
 */
export type TTSProvider = 'deepgram' | 'openai' | 'azure' | 'google' | 'aws' | 'elevenlabs' | 'playht' | 'cartesia' | 'rime' | 'kokoro' | 'gemini' | 'assemblyai';

export const TTS_PROVIDERS: Record<TTSProvider, { name: string; supportsSSML: boolean; multilingual?: boolean; isDefault?: boolean }> = {
  deepgram: { name: 'Deepgram Aura', supportsSSML: false, isDefault: true },
  openai: { name: 'OpenAI TTS', supportsSSML: false, multilingual: true },
  azure: { name: 'Azure Neural TTS', supportsSSML: true },
  google: { name: 'Google Cloud TTS', supportsSSML: true },
  aws: { name: 'AWS Polly', supportsSSML: true },
  elevenlabs: { name: 'ElevenLabs', supportsSSML: false, multilingual: true },
  playht: { name: 'PlayHT', supportsSSML: false, multilingual: true },
  cartesia: { name: 'Cartesia Sonic', supportsSSML: false, multilingual: true },
  rime: { name: 'Rime AI', supportsSSML: false, multilingual: true },
  kokoro: { name: 'Kokoro (HuggingFace)', supportsSSML: false, multilingual: true },
  gemini: { name: 'Google Gemini TTS', supportsSSML: false, multilingual: true },
  assemblyai: { name: 'AssemblyAI', supportsSSML: false },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a language code is supported
 */
export function isLanguageSupported(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  return sharedIsLanguageSupported(code);
}

/**
 * Validate a language code format
 */
export function isValidLanguageCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const trimmed = code.trim().toLowerCase();
  return /^[a-z]{2,3}(-[a-z]{2,4})?$/i.test(trimmed);
}

/**
 * Normalize a language code to ISO 639-1 (2-letter) format
 */
export function normalizeLanguageCode(code: string): string {
  return sharedNormalizeLanguageCode(code);
}

/**
 * Get language display name
 */
export function getLanguageName(code: string, displayLocale = 'en'): string {
  if (!code) return 'Unknown';

  return sharedGetLanguageName(code, displayLocale);
}

/**
 * Get native language name
 */
export function getLanguageNativeName(code: string): string {
  if (!code) return 'Unknown';

  return sharedGetLanguageNativeName(code);
}

/**
 * Quality levels for TTS support (ordered from best to worst)
 */
export const QUALITY_LEVELS: TTSSupport[] = ['excellent', 'good', 'moderate', 'limited', 'unknown', 'n/a'];

/**
 * Minimum quality level for languages to be shown in UI
 * Languages with ttsSupport below this level will be filtered out
 * 'good' = only show 'excellent' and 'good' languages
 */
export const MIN_QUALITY_LEVEL: TTSSupport = 'good';

/**
 * Check if a quality level meets the minimum threshold
 */
export function meetsQualityThreshold(quality: TTSSupport, minQuality: TTSSupport = MIN_QUALITY_LEVEL): boolean {
  const qualityIndex = QUALITY_LEVELS.indexOf(quality || 'unknown');
  const minIndex = QUALITY_LEVELS.indexOf(minQuality);
  return qualityIndex !== -1 && qualityIndex <= minIndex;
}

/**
 * Get all supported languages as array of objects
 * @param displayLocale - Locale for display names
 * @param filterByQuality - Whether to filter by MIN_QUALITY_LEVEL (default: true)
 */
export function getSupportedLanguages(displayLocale = 'en', filterByQuality = true): LanguageOption[] {
  return sharedGetSupportedLanguages(displayLocale)
    .filter((language) => language.code !== 'auto')
    .map((language) => {
      const metadata = LANGUAGE_METADATA[language.code] || sharedGetLanguageMetadata(language.code);

      return {
        code: language.code,
        name: language.name,
        nativeName: metadata.nativeName || language.nativeName,
        ttsSupport: metadata.ttsSupport || language.ttsSupport,
        region: metadata.region || language.region,
      };
    })
    .filter((language) => !filterByQuality || meetsQualityThreshold(language.ttsSupport))
    .sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Get all languages without quality filtering (for admin/debug purposes)
 */
export function getAllLanguages(displayLocale = 'en'): LanguageOption[] {
  return getSupportedLanguages(displayLocale, false);
}

/**
 * Get languages by region (quality-filtered)
 */
export function getLanguagesByRegion(region: LanguageRegion): LanguageOption[] {
  return getSupportedLanguages().filter(lang => lang.region === region);
}

/**
 * Get languages with good TTS support
 * Note: getSupportedLanguages() already filters by quality, this is for explicit filtering
 */
export function getLanguagesWithGoodTTS(): LanguageOption[] {
  // Since getSupportedLanguages() now filters by quality, this just returns the same
  return getSupportedLanguages();
}

/**
 * Get default voice for a language and gender
 * Supports multiple TTS providers - defaults to Deepgram
 */
export function getDefaultVoice(
  langCode: string, 
  gender: VoiceGender = 'female', 
  provider: TTSProvider | string = 'deepgram'
): string | null {
  const normalized = normalizeLanguageCode(langCode);
  const providerLower = (provider || 'deepgram').toLowerCase();
  
  // Map 'neutral' to 'female' as fallback (most voice APIs don't have neutral)
  const effectiveGender: 'male' | 'female' = gender === 'neutral' ? 'female' : gender;
  
  // Multilingual providers (not language-specific)
  if (providerLower === 'deepgram') {
    const voices = DEEPGRAM_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'openai') {
    const voices = OPENAI_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'elevenlabs') {
    const voices = ELEVENLABS_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'cartesia') {
    const voices = CARTESIA_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'rime' || providerLower === 'rime-tts') {
    const voices = RIME_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'kokoro' || providerLower === 'kokoro-tts') {
    const voices = KOKORO_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  if (providerLower === 'gemini' || providerLower === 'gemini-tts') {
    const voices = GEMINI_VOICES.premade[effectiveGender];
    return voices?.[0]?.id || null;
  }
  
  // Language-specific voice maps
  let voiceMap: Record<string, { male: string[]; female: string[] }>;
  switch (providerLower) {
    case 'azure':
      voiceMap = AZURE_NEURAL_VOICES;
      break;
    case 'google':
      voiceMap = GOOGLE_VOICES;
      break;
    case 'aws':
    case 'polly':
      voiceMap = AWS_POLLY_VOICES;
      break;
    default: {
      // Default to Deepgram for unknown providers
      const defaultVoices = DEEPGRAM_VOICES.premade[effectiveGender] || DEEPGRAM_VOICES.premade['female'];
      return defaultVoices?.[0]?.id || null;
    }
  }
  
  const langVoices = voiceMap[normalized];
  if (!langVoices) return null;
  
  const genderVoices = langVoices[effectiveGender] || langVoices['female'];
  return genderVoices?.[0] || null;
}

/**
 * Get all available voices for a language
 * Supports multiple TTS providers - defaults to Deepgram
 */
export function getAvailableVoices(
  langCode: string, 
  provider: TTSProvider | string = 'deepgram'
): { male: (string | ElevenLabsVoice | DeepgramVoice | OpenAIVoice | CartesiaVoice | RimeVoice | KokoroVoice | GeminiVoice)[]; female: (string | ElevenLabsVoice | DeepgramVoice | OpenAIVoice | CartesiaVoice | RimeVoice | KokoroVoice | GeminiVoice)[] } {
  const normalized = normalizeLanguageCode(langCode);
  const providerLower = (provider || 'deepgram').toLowerCase();
  
  // Multilingual providers (not language-specific)
  if (providerLower === 'deepgram') {
    return DEEPGRAM_VOICES.premade;
  }
  
  if (providerLower === 'openai') {
    return OPENAI_VOICES.premade;
  }
  
  if (providerLower === 'elevenlabs') {
    return ELEVENLABS_VOICES.premade;
  }
  
  if (providerLower === 'cartesia') {
    return CARTESIA_VOICES.premade;
  }
  
  if (providerLower === 'rime' || providerLower === 'rime-tts') {
    return RIME_VOICES.premade;
  }
  
  if (providerLower === 'kokoro' || providerLower === 'kokoro-tts') {
    return KOKORO_VOICES.premade;
  }
  
  if (providerLower === 'gemini' || providerLower === 'gemini-tts') {
    return GEMINI_VOICES.premade;
  }
  
  // Language-specific voice maps
  let voiceMap: Record<string, { male: string[]; female: string[] }>;
  switch (providerLower) {
    case 'azure':
      voiceMap = AZURE_NEURAL_VOICES;
      break;
    case 'google':
      voiceMap = GOOGLE_VOICES;
      break;
    case 'aws':
    case 'polly':
      voiceMap = AWS_POLLY_VOICES;
      break;
    default:
      return DEEPGRAM_VOICES.premade;
  }
  
  return voiceMap[normalized] || { male: [], female: [] };
}

/**
 * Get the default voice gender for a language
 */
export function getDefaultVoiceGender(langCode: string): VoiceGender {
  const normalized = normalizeLanguageCode(langCode);
  return DEFAULT_VOICE_GENDERS[normalized] || 'female';
}

/**
 * Format voice option for display in dropdown
 */
export function formatVoiceOption(voiceId: string): VoiceOption {
  // Parse Azure voice ID format: xx-XX-NameNeural
  const parts = voiceId.split('-');
  if (parts.length >= 3) {
    const langCode = parts.slice(0, 2).join('-');
    const name = parts.slice(2).join('-').replace('Neural', '');
    const isMale = name.toLowerCase().includes('guy') || 
                   name.toLowerCase().includes('davis') ||
                   name.toLowerCase().includes('ryan') ||
                   name.toLowerCase().includes('conrad') ||
                   name.toLowerCase().includes('diego') ||
                   name.toLowerCase().includes('alvaro') ||
                   name.toLowerCase().includes('jorge') ||
                   name.toLowerCase().includes('henri') ||
                   name.toLowerCase().includes('antonio');
    
    return {
      id: voiceId,
      name,
      gender: isMale ? 'male' : 'female',
      provider: 'azure',
      language: langCode,
    };
  }
  
  return {
    id: voiceId,
    name: voiceId,
    gender: 'female',
    provider: 'unknown',
    language: 'en',
  };
}

// ============================================================================
// STATIC VOICE DATA (used as fallback when socket fetch fails)
// ============================================================================

// Voice cache for static fallback only (socket responses are cached server-side)
const voiceCache: {
  data: Record<string, { male: VoiceOption[]; female: VoiceOption[] }>;
  timestamps: Record<string, number>;
  TTL: number;
} = {
  data: {},
  timestamps: {},
  TTL: 3600000, // 1 hour cache
};

/**
 * Clear voice cache (clears local static cache)
 */
export function clearVoiceCache(provider: string | null = null): void {
  if (provider) {
    delete voiceCache.data[provider];
    delete voiceCache.timestamps[provider];
  } else {
    voiceCache.data = {};
    voiceCache.timestamps = {};
  }
}

/**
 * Set cache TTL
 */
export function setVoiceCacheTTL(ttlMs: number): void {
  voiceCache.TTL = ttlMs;
}

// ============================================================================
// SOCKET-BASED VOICE FETCHING (The ONLY way to fetch voices from frontend)
// ============================================================================

/**
 * Result from socket voice fetch
 */
export interface SocketVoiceResponse {
  provider: string;
  language: string;
  voices: { male: VoiceOption[]; female: VoiceOption[] };
  providers?: Record<string, unknown>;
  error?: string;
}

/**
 * Fetch voices via socket connection (keeps API keys server-side)
 * 
 * This is the ONLY method for frontend voice fetching as it:
 * - Keeps TTS API keys on the server (security)
 * - Uses cached results from server
 * - Falls back to static lists if fetch fails
 * 
 * The backend will use the room's/user's configured TTS credentials to fetch voices.
 * 
 * @example
 * ```typescript
 * // In your React component
 * const voices = await fetchVoicesViaSocket(socket, 'elevenlabs', 'en');
 * console.log(voices.voices.male, voices.voices.female);
 * ```
 * 
 * @param socket - Socket.io socket instance
 * @param provider - TTS provider name (e.g., 'deepgram', 'elevenlabs', 'openai')
 * @param language - Language code (optional, default 'en')
 * @returns Promise with voices
 */
export function fetchVoicesViaSocket(
  socket: { emit: (event: string, data: unknown, callback?: (response: SocketVoiceResponse) => void) => void },
  provider: TTSProvider | string = 'deepgram',
  language: string = 'en'
): Promise<SocketVoiceResponse> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      // On timeout, return static voices as fallback
      const staticVoices = getAvailableVoices(language, provider);
      resolve({
        provider: provider.toString(),
        language,
        voices: {
          male: Array.isArray(staticVoices.male) 
            ? staticVoices.male.map(v => typeof v === 'string' ? { id: v, name: v, gender: 'male' as VoiceGender, provider: provider.toString(), language } : v as VoiceOption)
            : [],
          female: Array.isArray(staticVoices.female)
            ? staticVoices.female.map(v => typeof v === 'string' ? { id: v, name: v, gender: 'female' as VoiceGender, provider: provider.toString(), language } : v as VoiceOption)
            : [],
        },
        error: 'Request timed out, using static voices',
      });
    }, 5000);

    socket.emit('translation:getVoices', { provider, language }, (response: SocketVoiceResponse) => {
      clearTimeout(timeout);
      resolve(response);
    });
  });
}

/**
 * Fetch supported languages via socket
 * 
 * @param socket - Socket.io socket instance  
 * @param displayLocale - Locale for display names (default 'en')
 * @returns Promise with language options
 */
export function fetchLanguagesViaSocket(
  socket: { emit: (event: string, data: unknown, callback?: (response: { languages: LanguageOption[] }) => void) => void },
  displayLocale: string = 'en'
): Promise<LanguageOption[]> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      // On timeout, return static languages
      resolve(getSupportedLanguages(displayLocale));
    }, 5000);

    socket.emit('translation:getLanguages', { displayLocale }, (response: { languages: LanguageOption[] }) => {
      clearTimeout(timeout);
      resolve(response.languages || getSupportedLanguages(displayLocale));
    });
  });
}

