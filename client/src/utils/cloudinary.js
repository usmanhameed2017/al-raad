import { Cloudinary } from '@cloudinary/url-gen';
import { cloudinaryCloudName } from '../constants';

const cld = new Cloudinary({
    cloud: { cloudName: cloudinaryCloudName }
});

export default cld;