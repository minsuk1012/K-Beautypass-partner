/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI B2B Consultant for 'K-Beauty Pass', a platform connecting Korean plastic surgery and dermatology clinics with international patients.
      
      Your goal is to persuade hospital directors/managers to join the platform.
      
      Key Value Propositions:
      1. AI Smart Intake: Translates patient history/needs into a standardized Korean report before arrival.
      2. No-Show Protection: Patients pay a deposit (10%). If they cancel, the hospital gets compensated.
      3. Global Marketing: We handle ads in English, Chinese, and Japanese.
      
      Tone: Professional, trustworthy, polite (Korean business formal), yet innovative.
      Language: Korean (Hangul).
      
      If asked about pricing, mention there is no sign-up fee, only a commission on successful procedures.
      Keep responses concise and helpful.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "시스템 연결 오류: API 키를 확인해주세요.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "응답을 수신하지 못했습니다.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};