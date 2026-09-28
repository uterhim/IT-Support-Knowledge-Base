INSERT INTO articles (title, category, tags, content, views) VALUES
('How to reset a user''s Active Directory password', 'Account Access', ARRAY['active-directory','password','account'],
'## Steps

1. Open **Active Directory Users and Computers**.
2. Locate the user account and right-click → **Reset Password**.
3. Enter a temporary password meeting complexity requirements.
4. Check **User must change password at next logon**.
5. Confirm with the user via a verified channel (not the same account) before closing the ticket.

## Notes
Always verify identity before resetting a password — this is one of the most common social-engineering targets.', 42),

('Fixing "Outlook keeps freezing" on large attachments', 'Software', ARRAY['outlook','office365','performance'],
'## Symptoms
Outlook becomes unresponsive for 20–60 seconds when opening emails with large attachments.

## Fix
1. Disable hardware graphics acceleration: File → Options → Advanced → uncheck "Disable hardware graphics acceleration" (try toggling both ways).
2. Repair the Office installation: Control Panel → Programs → Microsoft 365 → Change → Quick Repair.
3. Check for a full or corrupted OST file; if large, consider archiving old mail.
4. Update to the latest Outlook build.

## Root cause
Usually a combination of OST file size and antivirus real-time scanning of attachments on open.', 31),

('Printer shows "offline" but is powered on', 'Hardware', ARRAY['printer','network','hardware'],
'## Steps
1. Confirm the printer has a valid IP address (print a network configuration page from the printer menu).
2. On the print server, open **Printer Properties → Ports** and confirm the port IP matches.
3. Ping the printer IP from the print server.
4. If unreachable, power-cycle the printer and check DHCP reservation hasn''t changed its IP.
5. If reachable but still offline in Windows, clear the print queue and restart the Print Spooler service.

## Prevention
Use DHCP reservations for all network printers to avoid IP drift after a lease renewal.', 27),

('VPN client error 809 — how to resolve', 'Network', ARRAY['vpn','remote-access','network'],
'## Cause
Error 809 usually means the VPN packet is being blocked, most often by a NAT device between the client and the VPN gateway (common on hotel/public Wi-Fi).

## Fix
1. Ask the user to try a different network (mobile hotspot) to confirm it is network-related.
2. If confirmed, switch the VPN protocol to one that tunnels over TCP 443 (e.g., SSTP or an SSL-based VPN) instead of a protocol relying on GRE/ESP, which many networks block.
3. If using a company-managed router at a home office, check for NAT-T settings.

See also: `04-vpn-connection-issues.md` in the Network Troubleshooting & Documentation project for the broader triage flow.', 19),

('Setting up a new employee''s workstation (onboarding checklist)', 'Onboarding', ARRAY['onboarding','provisioning','checklist'],
'## Pre-arrival
- [ ] Create AD account and mailbox
- [ ] Assign licenses (Microsoft 365, any role-specific software)
- [ ] Image laptop with standard build
- [ ] Add to relevant security groups and distribution lists

## Day one
- [ ] Configure email on device
- [ ] Set up MFA
- [ ] Grant access to shared drives/folders needed for their role
- [ ] Walk through help desk contact process

## Follow-up (first week)
- [ ] Confirm no access issues reported
- [ ] Collect feedback on setup experience', 15),

('Slow file access on the shared network drive', 'Network', ARRAY['network','file-server','performance'],
'## Triage
1. Confirm scope — one user or many? One file or all files?
2. Check network path: `ping fileserver` and check latency.
3. On the server, check disk I/O and current session/connection count.
4. Check for antivirus real-time scanning misconfigured to scan network shares on every access — a common, easily missed cause.
5. Check for a saturated switch port (duplex mismatch or bandwidth saturation) between the user and the server.

## Common root causes
- Antivirus scanning network paths unnecessarily
- Aging server disks nearing capacity
- A single large sync (e.g., backup job) saturating the link during business hours', 23);
