
import { Service, ThreatScenario, AutomationTemplate } from './types';

export const APP_NAME = "Security Automation Co-Pilot";

export const AVAILABLE_SERVICES: Service[] = [
  { id: 'entra_id', name: 'Microsoft Entra ID', description: 'Identity and access management' },
  { id: 'defender_endpoint', name: 'Microsoft Defender for Endpoint', description: 'Endpoint detection and response' },
  { id: 'defender_office365', name: 'Microsoft Defender for Office 365', description: 'Email and collaboration security' },
  { id: 'defender_cloud_apps', name: 'Microsoft Defender for Cloud Apps', description: 'Cloud access security broker' },
  { id: 'sentinel', name: 'Microsoft Sentinel', description: 'SIEM and SOAR solution' },
];

export const THREAT_SCENARIOS: ThreatScenario[] = [
  { id: 'lateral_movement', name: 'Lateral Movement', description: 'Detecting attackers moving across the network.' },
  { id: 'privilege_escalation', name: 'Privilege Escalation', description: 'Identifying attempts to gain higher access levels.' },
  { id: 'suspicious_sign_ins', name: 'Suspicious Sign-ins', description: 'Analyzing anomalous login activities.' },
  { id: 'ransomware_behavior', name: 'Ransomware Behavior', description: 'Detecting patterns indicative of ransomware attacks.' },
  { id: 'data_exfiltration', name: 'Data Exfiltration', description: 'Identifying unauthorized data transfers.' },
];

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  { id: 'isolate_endpoint', name: 'Isolate Endpoint', description: 'Automatically isolate compromised endpoints using Defender for Endpoint.', category: 'Endpoint Security' },
  { id: 'block_user', name: 'Block User Sign-in', description: 'Temporarily block user sign-in via Entra ID on suspicious activity.', category: 'Identity Security' },
  { id: 'phishing_response', name: 'Phishing Email Response', description: 'Quarantine phishing emails and notify security team via Defender for Office 365.', category: 'Email Security' },
  { id: 'credential_reset', name: 'Force Credential Reset', description: 'Force password reset for users exhibiting risky behavior.', category: 'Identity Security' },
  { id: 'alert_to_teams', name: 'Alert to Microsoft Teams', description: 'Send high-priority Sentinel alerts to a specific Teams channel.', category: 'Notification' },
];

export const INDUSTRIES: string[] = ["Finance", "Healthcare", "Manufacturing", "Retail", "Technology", "Government"];
export const GEO_LOCATIONS: string[] = ["North America", "Europe", "Asia-Pacific", "South America", "Africa", "Middle East"];
export const COMPANY_SIZES: string[] = ["Small (<100 employees)", "Medium (100-1000 employees)", "Large (1000-10000 employees)", "Enterprise (>10000 employees)"];

export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";
// export const GEMINI_IMAGE_MODEL = "imagen-3.0-generate-002"; // If image generation were needed