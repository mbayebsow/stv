import axios from "axios";
import channels from "../data/channels";
import {ChannelsType} from "../utils/interfaces";


const parseM3U8 = (content: string) => {
    const regex = /#EXTINF:-1\s.*?tvg-logo="(.*?)".*?group-title="(.*?)"\s?,\s(.*?)\s(https?:\/\/\S+\.m3u8)/g;

    const matches = content.matchAll(regex);

    const results = [];

    for (const match of matches) {
        const [_, logoUrl, groupTitle, channelName, streamUrl] = match;
        results.push({
            logo: logoUrl,
            group: groupTitle,
            name: channelName,
            url: streamUrl
        });
    }
    return results
};

export const getChannels = async (): Promise<ChannelsType[]> => {
    try {
        const response = await axios.get('https://i.mjh.nz/SamsungTVPlus/all.m3u8');
        const m3u8Content = response.data;
        const parsedData = parseM3U8(m3u8Content);
        return channels.concat(parsedData)
    } catch (error) {
        console.error('Error fetching M3U8 file:', error);
        return channels
    }
};