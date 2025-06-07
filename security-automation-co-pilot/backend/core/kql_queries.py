"""
KQL (Kusto Query Language) queries for Microsoft Sentinel and Defender threat hunting.
These queries can be used for automated threat detection, incident investigation, and reporting.
"""

# Phishing and Email Security Queries
PHISHING_DETECTION_QUERIES = {
    "suspicious_email_attachments": """
        EmailAttachmentInfo
        | where TimeGenerated > ago(24h)
        | where FileType in~ ("exe", "scr", "bat", "cmd", "com", "pif", "vbs", "js", "jar", "zip", "rar")
        | where FileName matches regex @"(?i)(invoice|payment|order|receipt|document|urgent|important)"
        | summarize Count=count() by SenderFromAddress, FileName, FileType
        | where Count > 1
        | order by Count desc
    """,
    
    "email_with_suspicious_links": """
        EmailUrlInfo
        | where TimeGenerated > ago(24h)
        | where Url matches regex @"(?i)(bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly)"
        | join EmailEvents on NetworkMessageId
        | where DeliveryAction == "Delivered"
        | project TimeGenerated, SenderFromAddress, RecipientEmailAddress, Subject, Url, UrlDomain
        | order by TimeGenerated desc
    """,
    
    "credential_harvesting_attempts": """
        EmailEvents
        | where TimeGenerated > ago(7d)
        | where Subject matches regex @"(?i)(verify|confirm|update|suspend|expire|urgent|action required)"
        | join EmailUrlInfo on NetworkMessageId
        | where Url matches regex @"(?i)(login|signin|account|password|verify)"
        | project TimeGenerated, SenderFromAddress, RecipientEmailAddress, Subject, Url
        | order by TimeGenerated desc
    """
}

# Malware and Threat Detection Queries
MALWARE_DETECTION_QUERIES = {
    "suspicious_process_execution": """
        DeviceProcessEvents
        | where TimeGenerated > ago(24h)
        | where ProcessCommandLine matches regex @"(?i)(powershell.*-enc|cmd.*\/c|wscript|cscript)"
        | where ProcessCommandLine matches regex @"(?i)(download|invoke|iex|frombase64|bypass)"
        | project TimeGenerated, DeviceName, AccountName, ProcessCommandLine, InitiatingProcessFileName
        | order by TimeGenerated desc
    """,
    
    "file_creation_in_temp_directories": """
        DeviceFileEvents
        | where TimeGenerated > ago(24h)
        | where FolderPath matches regex @"(?i)(\\temp\\|\\appdata\\|\\downloads\\)"
        | where FileName matches regex @"(?i)\.(exe|scr|bat|cmd|com|pif|vbs|js)$"
        | where ActionType == "FileCreated"
        | summarize Count=count() by DeviceName, FileName, FolderPath, InitiatingProcessFileName
        | where Count > 5
        | order by Count desc
    """,
    
    "unusual_network_connections": """
        DeviceNetworkEvents
        | where TimeGenerated > ago(24h)
        | where RemoteIPType == "Public"
        | where not(RemoteIP in ("8.8.8.8", "1.1.1.1", "208.67.222.222"))
        | summarize Count=count(), Ports=make_set(RemotePort) by DeviceName, RemoteIP, InitiatingProcessFileName
        | where Count > 10
        | order by Count desc
    """
}

# Privilege Escalation and Lateral Movement Queries
PRIVILEGE_ESCALATION_QUERIES = {
    "admin_group_changes": """
        DeviceEvents
        | where TimeGenerated > ago(24h)
        | where ActionType in ("UserAccountAddedToLocalGroup", "UserAccountRemovedFromLocalGroup")
        | where AdditionalFields contains "Administrators"
        | project TimeGenerated, DeviceName, AccountName, ActionType, AdditionalFields
        | order by TimeGenerated desc
    """,
    
    "service_account_logons": """
        DeviceLogonEvents
        | where TimeGenerated > ago(24h)
        | where LogonType in (2, 3, 10)  // Interactive, Network, RemoteInteractive
        | where AccountName matches regex @"(?i)(service|admin|system|backup)"
        | where isnotempty(RemoteDeviceName)
        | summarize LogonCount=count() by AccountName, RemoteDeviceName, DeviceName
        | where LogonCount > 5
        | order by LogonCount desc
    """,
    
    "suspicious_scheduled_tasks": """
        DeviceProcessEvents
        | where TimeGenerated > ago(24h)
        | where ProcessCommandLine matches regex @"(?i)(schtasks|at\.exe)"
        | where ProcessCommandLine matches regex @"(?i)(\/create|\/change)"
        | project TimeGenerated, DeviceName, AccountName, ProcessCommandLine
        | order by TimeGenerated desc
    """
}

# Data Exfiltration and Insider Threat Queries
DATA_EXFILTRATION_QUERIES = {
    "large_file_uploads": """
        DeviceNetworkEvents
        | where TimeGenerated > ago(24h)
        | where ActionType == "NetworkConnectionEvents"
        | where RemoteIPType == "Public"
        | summarize TotalBytes=sum(RemotePort) by DeviceName, AccountName, RemoteIP, InitiatingProcessFileName
        | where TotalBytes > 100000000  // 100MB
        | order by TotalBytes desc
    """,
    
    "usb_device_usage": """
        DeviceEvents
        | where TimeGenerated > ago(24h)
        | where ActionType in ("UsbDriveMount", "UsbDriveUnmount")
        | project TimeGenerated, DeviceName, AccountName, ActionType, AdditionalFields
        | order by TimeGenerated desc
    """,
    
    "cloud_storage_uploads": """
        DeviceNetworkEvents
        | where TimeGenerated > ago(24h)
        | where RemoteUrl matches regex @"(?i)(dropbox|onedrive|googledrive|box\.com|icloud)"
        | where ActionType == "ConnectionSuccess"
        | project TimeGenerated, DeviceName, AccountName, RemoteUrl, InitiatingProcessFileName
        | order by TimeGenerated desc
    """
}

# Compromised Account Detection Queries
ACCOUNT_COMPROMISE_QUERIES = {
    "impossible_travel": """
        SigninLogs
        | where TimeGenerated > ago(24h)
        | where ResultType == 0  // Successful sign-ins
        | project TimeGenerated, UserPrincipalName, IPAddress, Location, ClientAppUsed
        | sort by UserPrincipalName, TimeGenerated asc
        | serialize
        | extend PrevLocation = prev(Location, 1), PrevTime = prev(TimeGenerated, 1)
        | where UserPrincipalName == prev(UserPrincipalName, 1)
        | where Location != PrevLocation
        | extend TimeDiff = datetime_diff('minute', TimeGenerated, PrevTime)
        | where TimeDiff < 60  // Less than 1 hour between logins from different locations
        | project TimeGenerated, UserPrincipalName, IPAddress, Location, PrevLocation, TimeDiff
        | order by TimeGenerated desc
    """,
    
    "multiple_failed_logins": """
        SigninLogs
        | where TimeGenerated > ago(24h)
        | where ResultType != 0  // Failed sign-ins
        | summarize FailedAttempts=count(), IPAddresses=make_set(IPAddress) by UserPrincipalName, bin(TimeGenerated, 1h)
        | where FailedAttempts > 10
        | order by FailedAttempts desc
    """,
    
    "unusual_application_access": """
        SigninLogs
        | where TimeGenerated > ago(24h)
        | where ResultType == 0
        | where ClientAppUsed !in ("Browser", "Mobile Apps and Desktop clients", "Exchange ActiveSync")
        | summarize Count=count() by UserPrincipalName, ClientAppUsed, AppDisplayName
        | where Count > 5
        | order by Count desc
    """
}

# Security Control Monitoring Queries
SECURITY_CONTROL_QUERIES = {
    "antivirus_disabled": """
        DeviceEvents
        | where TimeGenerated > ago(24h)
        | where ActionType == "AntivirusDisabled"
        | project TimeGenerated, DeviceName, AccountName, ActionType, AdditionalFields
        | order by TimeGenerated desc
    """,
    
    "firewall_changes": """
        DeviceEvents
        | where TimeGenerated > ago(24h)
        | where ActionType in ("FirewallInboundRuleModified", "FirewallOutboundRuleModified")
        | project TimeGenerated, DeviceName, AccountName, ActionType, AdditionalFields
        | order by TimeGenerated desc
    """,
    
    "security_event_log_cleared": """
        DeviceEvents
        | where TimeGenerated > ago(24h)
        | where ActionType == "SecurityLogCleared"
        | project TimeGenerated, DeviceName, AccountName, ActionType
        | order by TimeGenerated desc
    """
}

# Incident Investigation Queries
INCIDENT_INVESTIGATION_QUERIES = {
    "process_tree_analysis": """
        DeviceProcessEvents
        | where TimeGenerated > ago(24h)
        | where InitiatingProcessFileName == "{suspicious_process}"
        | extend Level = 0
        | union (
            DeviceProcessEvents
            | where TimeGenerated > ago(24h)
            | where InitiatingProcessId in (
                DeviceProcessEvents
                | where InitiatingProcessFileName == "{suspicious_process}"
                | distinct ProcessId
            )
            | extend Level = 1
        )
        | project TimeGenerated, DeviceName, Level, ProcessId, ProcessCommandLine, InitiatingProcessId, InitiatingProcessFileName
        | order by TimeGenerated, Level
    """,
    
    "file_hash_investigation": """
        DeviceFileEvents
        | where TimeGenerated > ago(30d)
        | where SHA256 == "{file_hash}"
        | project TimeGenerated, DeviceName, ActionType, FileName, FolderPath, SHA256
        | order by TimeGenerated desc
    """,
    
    "user_activity_timeline": """
        let user = "{user_principal_name}";
        union
        (SigninLogs | where UserPrincipalName == user | project TimeGenerated, Activity="Sign-in", Details=strcat("Location: ", Location, ", IP: ", IPAddress)),
        (AuditLogs | where InitiatedBy.user.userPrincipalName == user | project TimeGenerated, Activity="Audit", Details=strcat("Operation: ", OperationName)),
        (DeviceLogonEvents | where AccountName == user | project TimeGenerated, Activity="Device Logon", Details=strcat("Device: ", DeviceName, ", Type: ", LogonType))
        | order by TimeGenerated desc
    """
}

def get_query_category(category: str) -> dict:
    """Get all queries for a specific category."""
    categories = {
        "phishing": PHISHING_DETECTION_QUERIES,
        "malware": MALWARE_DETECTION_QUERIES,
        "privilege_escalation": PRIVILEGE_ESCALATION_QUERIES,
        "data_exfiltration": DATA_EXFILTRATION_QUERIES,
        "account_compromise": ACCOUNT_COMPROMISE_QUERIES,
        "security_controls": SECURITY_CONTROL_QUERIES,
        "investigation": INCIDENT_INVESTIGATION_QUERIES
    }
    return categories.get(category, {})

def get_all_queries() -> dict:
    """Get all available KQL queries organized by category."""
    return {
        "phishing": PHISHING_DETECTION_QUERIES,
        "malware": MALWARE_DETECTION_QUERIES,
        "privilege_escalation": PRIVILEGE_ESCALATION_QUERIES,
        "data_exfiltration": DATA_EXFILTRATION_QUERIES,
        "account_compromise": ACCOUNT_COMPROMISE_QUERIES,
        "security_controls": SECURITY_CONTROL_QUERIES,
        "investigation": INCIDENT_INVESTIGATION_QUERIES
    } 