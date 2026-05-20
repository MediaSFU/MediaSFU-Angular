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
export type VoiceGender = 'male' | 'female' | 'neutral';
export type TTSSupport = 'excellent' | 'good' | 'moderate' | 'limited' | 'unknown' | 'n/a';
export type LanguageRegion = 'global' | 'europe' | 'asia' | 'south-asia' | 'mena' | 'africa' | 'caucasus' | 'central-asia' | 'constructed' | 'special' | 'other';
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
    voiceId?: string;
    style?: string;
}
/**
 * Voice configuration for translation
 * Used in translation:subscribe and per-language voice settings
 */
export interface TranslationVoiceConfig {
    voiceGender?: VoiceGender;
    voiceId?: string;
    voiceClone?: {
        provider: 'elevenlabs' | 'playht' | 'coqui';
        voiceId: string;
        stability?: number;
        similarity?: number;
    };
    sttNickName?: string;
    llmNickName?: string;
    ttsNickName?: string;
    sttParams?: Record<string, string | number | boolean>;
    llmParams?: Record<string, string | number | boolean>;
    ttsParams?: Record<string, string | number | boolean>;
}
/**
 * Language entry with voice config override
 */
export interface TranslationLanguageEntry {
    code: string;
    nickname?: string;
    voiceConfig?: TranslationVoiceConfig;
}
/**
 * Complete list of supported language codes (ISO 639-1 primarily)
 */
export declare const SUPPORTED_LANGUAGE_CODES: string[];
/**
 * Language metadata with display names and additional info
 */
export declare const LANGUAGE_METADATA: Record<string, LanguageMetadata>;
export declare const VOICE_GENDERS: Record<string, VoiceGender>;
/**
 * Default voice gender per language
 */
export declare const DEFAULT_VOICE_GENDERS: Record<string, VoiceGender>;
/**
 * Azure Neural Voice mappings by language and gender
 */
export declare const AZURE_NEURAL_VOICES: Record<string, {
    male: string[];
    female: string[];
}>;
/**
 * Google Cloud TTS voice mappings
 */
export declare const GOOGLE_VOICES: Record<string, {
    male: string[];
    female: string[];
}>;
/**
 * AWS Polly voice mappings
 */
export declare const AWS_POLLY_VOICES: Record<string, {
    male: string[];
    female: string[];
    neural?: {
        male: string[];
        female: string[];
    };
}>;
/**
 * Deepgram Aura voice mappings (multilingual)
 */
export interface DeepgramVoice {
    id: string;
    name: string;
}
export declare const DEEPGRAM_VOICES: {
    premade: {
        male: DeepgramVoice[];
        female: DeepgramVoice[];
    };
};
/**
 * OpenAI TTS voice mappings (multilingual)
 */
export interface OpenAIVoice {
    id: string;
    name: string;
}
export declare const OPENAI_VOICES: {
    premade: {
        male: OpenAIVoice[];
        female: OpenAIVoice[];
    };
};
/**
 * ElevenLabs pre-made voices (multilingual)
 */
export interface ElevenLabsVoice {
    id: string;
    name: string;
}
export declare const ELEVENLABS_VOICES: {
    premade: {
        male: ElevenLabsVoice[];
        female: ElevenLabsVoice[];
    };
};
/**
 * Cartesia Sonic voice mappings
 */
export interface CartesiaVoice {
    id: string;
    name: string;
}
export declare const CARTESIA_VOICES: {
    premade: {
        male: CartesiaVoice[];
        female: CartesiaVoice[];
    };
};
/**
 * Rime AI TTS voice mappings
 * Documentation: https://rime.ai/docs/voices
 */
export interface RimeVoice {
    id: string;
    name: string;
}
export declare const RIME_VOICES: {
    premade: {
        male: RimeVoice[];
        female: RimeVoice[];
    };
};
/**
 * Kokoro TTS voice mappings (via Hugging Face)
 * Open-source multilingual TTS
 */
export interface KokoroVoice {
    id: string;
    name: string;
}
export declare const KOKORO_VOICES: {
    premade: {
        male: KokoroVoice[];
        female: KokoroVoice[];
    };
};
/**
 * Google Gemini TTS voice mappings
 */
export interface GeminiVoice {
    id: string;
    name: string;
}
export declare const GEMINI_VOICES: {
    premade: {
        male: GeminiVoice[];
        female: GeminiVoice[];
    };
};
/**
 * Supported TTS providers
 */
export type TTSProvider = 'deepgram' | 'openai' | 'azure' | 'google' | 'aws' | 'elevenlabs' | 'playht' | 'cartesia' | 'rime' | 'kokoro' | 'gemini' | 'assemblyai';
export declare const TTS_PROVIDERS: Record<TTSProvider, {
    name: string;
    supportsSSML: boolean;
    multilingual?: boolean;
    isDefault?: boolean;
}>;
/**
 * Check if a language code is supported
 */
export declare function isLanguageSupported(code: string): boolean;
/**
 * Validate a language code format
 */
export declare function isValidLanguageCode(code: string): boolean;
/**
 * Normalize a language code to ISO 639-1 (2-letter) format
 */
export declare function normalizeLanguageCode(code: string): string;
/**
 * Get language display name
 */
export declare function getLanguageName(code: string, displayLocale?: string): string;
/**
 * Get native language name
 */
export declare function getLanguageNativeName(code: string): string;
/**
 * Quality levels for TTS support (ordered from best to worst)
 */
export declare const QUALITY_LEVELS: TTSSupport[];
/**
 * Minimum quality level for languages to be shown in UI
 * Languages with ttsSupport below this level will be filtered out
 * 'good' = only show 'excellent' and 'good' languages
 */
export declare const MIN_QUALITY_LEVEL: TTSSupport;
/**
 * Check if a quality level meets the minimum threshold
 */
export declare function meetsQualityThreshold(quality: TTSSupport, minQuality?: TTSSupport): boolean;
/**
 * Get all supported languages as array of objects
 * @param displayLocale - Locale for display names
 * @param filterByQuality - Whether to filter by MIN_QUALITY_LEVEL (default: true)
 */
export declare function getSupportedLanguages(displayLocale?: string, filterByQuality?: boolean): LanguageOption[];
/**
 * Get all languages without quality filtering (for admin/debug purposes)
 */
export declare function getAllLanguages(displayLocale?: string): LanguageOption[];
/**
 * Get languages by region (quality-filtered)
 */
export declare function getLanguagesByRegion(region: LanguageRegion): LanguageOption[];
/**
 * Get languages with good TTS support
 * Note: getSupportedLanguages() already filters by quality, this is for explicit filtering
 */
export declare function getLanguagesWithGoodTTS(): LanguageOption[];
/**
 * Get default voice for a language and gender
 * Supports multiple TTS providers - defaults to Deepgram
 */
export declare function getDefaultVoice(langCode: string, gender?: VoiceGender, provider?: TTSProvider | string): string | null;
/**
 * Get all available voices for a language
 * Supports multiple TTS providers - defaults to Deepgram
 */
export declare function getAvailableVoices(langCode: string, provider?: TTSProvider | string): {
    male: (string | ElevenLabsVoice | DeepgramVoice | OpenAIVoice | CartesiaVoice | RimeVoice | KokoroVoice | GeminiVoice)[];
    female: (string | ElevenLabsVoice | DeepgramVoice | OpenAIVoice | CartesiaVoice | RimeVoice | KokoroVoice | GeminiVoice)[];
};
/**
 * Get the default voice gender for a language
 */
export declare function getDefaultVoiceGender(langCode: string): VoiceGender;
/**
 * Format voice option for display in dropdown
 */
export declare function formatVoiceOption(voiceId: string): VoiceOption;
/**
 * Clear voice cache (clears local static cache)
 */
export declare function clearVoiceCache(provider?: string | null): void;
/**
 * Set cache TTL
 */
export declare function setVoiceCacheTTL(ttlMs: number): void;
/**
 * Result from socket voice fetch
 */
export interface SocketVoiceResponse {
    provider: string;
    language: string;
    voices: {
        male: VoiceOption[];
        female: VoiceOption[];
    };
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
export declare function fetchVoicesViaSocket(socket: {
    emit: (event: string, data: unknown, callback?: (response: SocketVoiceResponse) => void) => void;
}, provider?: TTSProvider | string, language?: string): Promise<SocketVoiceResponse>;
/**
 * Fetch supported languages via socket
 *
 * @param socket - Socket.io socket instance
 * @param displayLocale - Locale for display names (default 'en')
 * @returns Promise with language options
 */
export declare function fetchLanguagesViaSocket(socket: {
    emit: (event: string, data: unknown, callback?: (response: {
        languages: LanguageOption[];
    }) => void) => void;
}, displayLocale?: string): Promise<LanguageOption[]>;
