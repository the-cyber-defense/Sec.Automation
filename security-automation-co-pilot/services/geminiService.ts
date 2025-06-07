
import { GoogleGenAI, GenerateContentResponse, GroundingMetadata } from "@google/genai";
import { GEMINI_TEXT_MODEL } from '../constants';
import { OrganizationContext } from "../types";

// Ensure API_KEY is available. In a real app, this would be set in the environment.
// For this environment, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY environment variable not found. Gemini API calls will fail.");
  // Potentially throw an error or handle this state in the UI
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" }); // Fallback to prevent crash if key is missing

const parseJsonFromText = (text: string): any => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s; // Matches ```json ... ``` or ``` ... ```
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    // Fallback: return the original text if it's not valid JSON, so the user can see it
    return { error: "Failed to parse JSON", originalText: text }; 
  }
};

export const generateKQLQuery = async (scenario: string, services: string[]): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  const prompt = `
    Generate a KQL query for Microsoft Sentinel to detect "${scenario}".
    Consider the following active Microsoft security services: ${services.join(', ')}.
    The query should be practical and aim for high fidelity detections.
    Provide only the KQL query string. No explanations before or after.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating KQL query:", error);
    return { text: `Error generating KQL: ${(error as Error).message}` };
  }
};

export const generatePlaybookOutline = async (scenario: string, services: string[], automationAction: string): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  const prompt = `
    Outline an Azure Logic App playbook (in clear, step-by-step pseudo-code or descriptive text) to respond to a "${scenario}" security incident.
    The primary automation action should be: "${automationAction}".
    The playbook can leverage these Microsoft security services: ${services.join(', ')}.
    Describe the triggers, conditions, actions, and any necessary API calls or integrations.
    Focus on a logical flow that a security engineer can understand and implement.
    Provide only the playbook outline. No verbose explanations.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating playbook outline:", error);
    return { text: `Error generating playbook: ${(error as Error).message}` };
  }
};

export const generateSentinelWorkbookDescription = async (orgContext: OrganizationContext, services: string[], focus: string): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  const prompt = `
    Describe the key sections, visualizations (types of charts, tables, metrics), and KQL query purposes for a Microsoft Sentinel workbook.
    The workbook should focus on: "${focus}".
    Tailor this for an organization with the following context:
    - Industry: ${orgContext.industry}
    - Geo-location: ${orgContext.geoLocation}
    - Size: ${orgContext.size}
    Consider these active Microsoft services: ${services.join(', ')}.
    The output should be a structured description, suitable for guiding workbook creation.
    For example:
    ## Workbook Title: [Relevant Title]
    ### Section 1: Overview
    - Visualization: Scorecard for critical alerts (KQL: summarize count by Severity)
    - Visualization: Trend chart of incidents over time (KQL: bin TimeGenerated | summarize count by bin)
    ### Section 2: [Specific Focus Area, e.g., Identity Risk]
    - Visualization: Table of risky users (KQL: SecurityAlert | where ProviderName == "IPC" | summarize by UserPrincipalName)
    - Visualization: Map of sign-in locations (KQL: SigninLogs | summarize by Location)
    Provide the description only.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating Sentinel workbook description:", error);
    return { text: `Error generating workbook description: ${(error as Error).message}` };
  }
};


export const generateM365DashboardWidgetDescription = async (widgetType: string, services: string[]): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  const prompt = `
    Provide a concise description and suggest key data points for a Microsoft 365 Defender dashboard widget titled "${widgetType}".
    This widget should leverage data from relevant services among: ${services.join(', ')}.
    For example, if widgetType is "Top Risky Users", mention Entra ID risky user score, Defender for Endpoint alerts, etc.
    Suggest 2-3 key metrics or visualizations for this widget.
    Format as a brief textual description.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating M365 dashboard widget description:", error);
    return { text: `Error generating widget description: ${(error as Error).message}` };
  }
};

export const generateAutomationTemplateLogic = async (templateName: string, description: string, services: string[]): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  const prompt = `
    For an automation template named "${templateName}" with the description "${description}", provide a high-level pseudo-code or logical flow for its implementation.
    This automation would primarily use capabilities from the following Microsoft services: ${services.join(', ')}.
    Focus on clarity and the main steps involved.
    Example for "Isolate Endpoint":
    1. Trigger: New high-severity alert from Defender for Endpoint.
    2. Action: Get device ID from alert.
    3. Action: Call Defender for Endpoint API to isolate device.
    4. Action: Log action and notify security team.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating automation template logic:", error);
    return { text: `Error generating template logic: ${(error as Error).message}` };
  }
};


export const generateWithGoogleSearch = async (query: string): Promise<{ text: string, groundingMetadata?: GroundingMetadata }> => {
  if (!apiKey) return { text: "Error: API Key not configured." };
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: query,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    return { text: response.text, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error)
 {
    console.error("Error with Google Search grounding:", error);
    return { text: `Error with Google Search: ${(error as Error).message}` };
  }
};

export const generateJsonOutput = async (prompt: string): Promise<{ data: any, groundingMetadata?: GroundingMetadata, error?: string }> => {
  if (!apiKey) return { data: null, error: "API Key not configured." };
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const parsedData = parseJsonFromText(response.text);
    if (parsedData.error) {
      return { data: null, error: parsedData.error, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
    }
    return { data: parsedData, groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error) {
    console.error("Error generating JSON output:", error);
    return { data: null, error: `Error generating JSON: ${(error as Error).message}` };
  }
};