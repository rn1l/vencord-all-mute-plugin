/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addContextMenuPatch, removeContextMenuPatch } from "@api/ContextMenu";
import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { Menu, showToast, Toasts } from "@webpack/common";

const GuildNotificationSettingsActions = findByPropsLazy("updateGuildNotificationSettings");

export default definePlugin({
    name: "Server All Mute",
    description: "Mutes/Unmutes all server notification options with one click in the context menu.",
    authors: [{ name: "Antigravity & User", id: 0n }],

    start() {
        this.patch = addContextMenuPatch("guild-context", (children, props) => {
            const guildId = props.guild?.id || props.guildId;
            if (!guildId) return;

            children.unshift(
                <Menu.MenuGroup>
                    <Menu.MenuItem
                        id="server-all-mute"
                        label="All Mute"
                        action={async () => {
                            try {
                                if (GuildNotificationSettingsActions && typeof GuildNotificationSettingsActions.updateGuildNotificationSettings === "function") {
                                    await GuildNotificationSettingsActions.updateGuildNotificationSettings(guildId, {
                                        muted: true,
                                        mute_config: {
                                            selected_time_window: -1, // Until unmuted (ミュート解除するまで)
                                            end_time: null
                                        },
                                        message_notifications: 2, // Nothing (通知しない)
                                        suppress_everyone: true, // Suppress @everyone and @here (@everyoneと@hereの通知を行わない)
                                        suppress_roles: true, // Suppress all role @mentions (すべてのロール@mentionsを非表示にする)
                                        notify_highlights: 1, // Suppress Highlights (ハイライト通知を受け取らない)
                                        disable_highlights: true, // Fallback fields
                                        suppress_highlights: true,
                                        mute_scheduled_events: true // Mute New Events (新しいイベントをミュート)
                                    });

                                    if (typeof showToast === "function") {
                                        showToast("Server fully muted!", Toasts?.Type?.SUCCESS ?? 1);
                                    }
                                } else {
                                    console.error("[AllMute] updateGuildNotificationSettings function not found in Webpack.");
                                    if (typeof showToast === "function") {
                                        showToast("Error: Mute function not found.", Toasts?.Type?.FAILURE ?? 2);
                                    }
                                }
                            } catch (e) {
                                console.error("[AllMute] Failed to mute guild:", e);
                                if (typeof showToast === "function") {
                                    showToast("Failed to mute server.", Toasts?.Type?.FAILURE ?? 2);
                                }
                            }
                        }}
                    />
                    <Menu.MenuItem
                        id="server-all-unmute"
                        label="All Unmute"
                        action={async () => {
                            try {
                                if (GuildNotificationSettingsActions && typeof GuildNotificationSettingsActions.updateGuildNotificationSettings === "function") {
                                    await GuildNotificationSettingsActions.updateGuildNotificationSettings(guildId, {
                                        muted: false,
                                        mute_config: null,
                                        message_notifications: 0, // All Messages (すべてのメッセージ)
                                        suppress_everyone: false, // Suppress @everyone and @here (@everyoneと@hereの通知を行わない) -> Unchecked
                                        suppress_roles: false, // Suppress all role @mentions (すべてのロール@mentionsを非表示にする) -> Unchecked
                                        notify_highlights: 0, // Suppress Highlights (ハイライト通知を受け取らない) -> Unchecked
                                        disable_highlights: false,
                                        suppress_highlights: false,
                                        mute_scheduled_events: false // Mute New Events (新しいイベントをミュート) -> Unchecked
                                    });

                                    if (typeof showToast === "function") {
                                        showToast("Server fully unmuted!", Toasts?.Type?.SUCCESS ?? 1);
                                    }
                                } else {
                                    console.error("[AllMute] updateGuildNotificationSettings function not found in Webpack.");
                                    if (typeof showToast === "function") {
                                        showToast("Error: Unmute function not found.", Toasts?.Type?.FAILURE ?? 2);
                                    }
                                }
                            } catch (e) {
                                console.error("[AllMute] Failed to unmute guild:", e);
                                if (typeof showToast === "function") {
                                    showToast("Failed to unmute server.", Toasts?.Type?.FAILURE ?? 2);
                                }
                            }
                        }}
                    />
                </Menu.MenuGroup>
            );
        });
    },

    stop() {
        if (this.patch) {
            removeContextMenuPatch("guild-context", this.patch);
        }
    }
});
