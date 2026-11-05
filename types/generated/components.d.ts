import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedPhotoWithDescription extends Struct.ComponentSchema {
  collectionName: 'components_shared_photo_with_descriptions';
  info: {
    displayName: 'Photo with description';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedTopAlbum extends Struct.ComponentSchema {
  collectionName: 'components_shared_top_albums';
  info: {
    displayName: 'Top album';
    icon: 'music';
  };
  attributes: {
    album: Schema.Attribute.String & Schema.Attribute.Required;
    band: Schema.Attribute.String & Schema.Attribute.Required;
    cover: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    position: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
  };
}

export interface SharedVideoLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_links';
  info: {
    displayName: 'Video link';
    icon: 'television';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.media': SharedMedia;
      'shared.photo-with-description': SharedPhotoWithDescription;
      'shared.seo': SharedSeo;
      'shared.top-album': SharedTopAlbum;
      'shared.video-link': SharedVideoLink;
    }
  }
}
