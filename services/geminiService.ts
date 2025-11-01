import { GoogleGenAI } from "@google/genai";
import type { DeFiData, Protocol, Network } from '../types';

// This is a placeholder for the API key.
// In a real-world scenario, this should be handled securely and not exposed on the client-side.
// The execution environment is expected to provide this variable.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key is not set in environment variables. AI analysis will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeDeFiData = async (
    data: DeFiData,
    protocol: Protocol,
    network: Network,
    address: string
): Promise<string> => {

    if (!API_KEY) {
        return "AI analysis is unavailable because the Gemini API key is not configured.";
    }

    const suppliedAssetsString = data.supplied.length > 0
        ? data.supplied.map(a => `- ${a.asset}: ${a.amount.toFixed(4)} ($${a.valueUSD.toFixed(2)})`).join('\n')
        : 'None';
        
    const borrowedAssetsString = data.borrowed.length > 0
        ? data.borrowed.map(a => `- ${a.asset}: ${a.amount.toFixed(4)} ($${a.valueUSD.toFixed(2)})`).join('\n')
        : 'None';

    const prompt = `
You are a DeFi expert analyst. Analyze the following on-chain lending and borrowing data for the wallet address ${address} on the ${protocol} protocol on the ${network} network. 

Provide a concise, insightful summary of the user's strategy, risk profile, and potential areas for optimization. Speak directly to the user in a friendly but professional tone (e.g., "Your portfolio shows..."). Format the output as clean markdown with clear headings for 'Strategy', 'Risk Profile', and 'Suggestions'. Do not use code blocks.

**User's DeFi Data:**
- **Total Supplied:** $${data.totalSuppliedUSD.toFixed(2)}
- **Total Borrowed:** $${data.totalBorrowedUSD.toFixed(2)}
- **Net APY:** ${data.netAPY.toFixed(2)}%

**Supplied Assets:**
${suppliedAssetsString}

**Borrowed Assets:**
${borrowedAssetsString}

**Analysis:**
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing DeFi data with Gemini:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             return "Failed to analyze data. The provided Gemini API key is invalid. Please check your configuration.";
        }
        return "Failed to analyze data. The AI model may be temporarily unavailable or there was an issue with the request.";
    }
};
