export class Cdn {
    #baseUrl = 'https://cdn.discordapp.com';

    getAvatar(id, filename) {
        return `${this.#baseUrl}/avatars/${id}/${filename}.png`;
    }

    getGuildIconUrl(guildId, iconHash) {
        return `${this.#baseUrl}/icons/${guildId}/${iconHash}.png`;
    }

    getGuildSplashUrl(guildId, splashHash) {
        return `${this.#baseUrl}/splashes/${guildId}/${splashHash}.png`;
    }

    getGuildBannerUrl(guildId, bannerHash) {
        return `${this.#baseUrl}/banners/${guildId}/${bannerHash}.png`;
    }

    getGuildMemberAvatarUrl(guildId, userId, avatarHash) {
        return `${this.#baseUrl}/guilds/${guildId}/users/${userId}/avatars/${avatarHash}.png`;
    }

    getGuildMemberBannerUrl(userId, bannerHash) {
        return `${this.#baseUrl}/banners/${userId}/${bannerHash}.png`;
    }

    getUserBannerUrl(userId, bannerHash) {
        return `${this.#baseUrl}/users/${userId}/banners/${bannerHash}.png`;
    }

    getEmojiUrl(emojiId) {
        return `${this.#baseUrl}/emojis/${emojiId}.png`;
    }

    getStickerUrl(stickerId) {
        return `${this.#baseUrl}/stickers/${stickerId}.png`;
    }
}
