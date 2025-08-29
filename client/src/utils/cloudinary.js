import { Cloudinary } from '@cloudinary/url-gen';
import { cloudinaryCloudName } from '../constants';
import { bitRate } from '@cloudinary/url-gen/actions/transcode';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({
    cloud: { cloudName: cloudinaryCloudName }
});

export const getOptimized = (url) => {
    // Extract public ID
    const publicId = `al-raad/audios/${url.split("/al-raad/audios/").pop().split(".")[0]}`;

    // Cloudinary treats audio as video resource
    const audio = cld.video(publicId)
    .transcode(bitRate('128k'))
    .delivery(format('mp3'), quality('auto'));

    return audio.toURL();
}

export default cld;