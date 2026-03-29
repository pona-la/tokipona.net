export interface DiscordWidgetData {
  id?: string;
  name?: string;
  invite?: string;
  inviteCode?: string;
  icon?: string;
  banner?: string;
  splash?: string;
  description?: string;
  approximate_member_count?: string;
  approximate_presence_count?: string;
}

async function fetchInvite(guildId: string): Promise<string | null> {
  const widgetRes = await fetch(
    `https://discord.com/api/guilds/${guildId}/widget.json`,
  );
  if (!widgetRes.ok) return null;
  const widget = await widgetRes.json();
  try {
    const url = new URL(widget.instant_invite);
    let inviteCode = url.pathname.split("/").filter(Boolean).pop() ?? null;
    return inviteCode;
  } catch {}
  return null;
}

async function fetchInviteData(
  inviteCode: string,
): Promise<DiscordWidgetData | null> {
  const inviteRes = await fetch(
    `https://discord.com/api/v8/invites/${inviteCode}?with_counts=true`,
  );
  if (!inviteRes.ok) return null;
  const inviteData = (await inviteRes.json()) ?? {};
  const guild = inviteData?.guild ?? {};
  const data = {
    id: guild.id,
    name: guild.name,
    invite: inviteCode ? `https://discord.gg/${inviteCode}` : undefined,
    inviteCode: inviteCode ? inviteCode : undefined,
    icon: guild.icon
      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
      : undefined,
    banner: guild.banner
      ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png`
      : undefined,
    splash: guild.splash
      ? `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png`
      : undefined,
    description: guild.description ?? undefined,
    approximate_member_count: inviteData?.approximate_member_count,
    approximate_presence_count: inviteData?.approximate_presence_count,
  };
  return data;
}

export async function fetchServerData(
  guildId?: string | null,
  inviteCode?: string | null,
): Promise<DiscordWidgetData | null> {
  let data: DiscordWidgetData | null;
  if (guildId && !inviteCode) {
    inviteCode = await fetchInvite(guildId);
  }
  if (inviteCode) {
    data = await fetchInviteData(inviteCode);
    return data;
  }
  return null;
}
