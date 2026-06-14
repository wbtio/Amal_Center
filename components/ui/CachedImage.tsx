import React from 'react';
import { Image, type ImageProps } from 'expo-image';
import { getProductThumbnailUrl, getProductFullUrl } from '../../lib/imageUrl';

function getSourceUri(source: ImageProps['source']): string | undefined {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return undefined;
  if ('uri' in source && typeof source.uri === 'string') return source.uri;
  return undefined;
}

type CachedImageProps = ImageProps & {
  /**
   * true  → صورة مصغّرة 300×300 من ImageKit (افتراضي — للقوائم والبطاقات)
   * false → صورة كاملة 900×900 من ImageKit (لصفحة تفاصيل المنتج)
   */
  thumbnail?: boolean;
};

export function CachedImage({
  cachePolicy = 'memory-disk',
  recyclingKey,
  source,
  thumbnail = true,
  ...props
}: CachedImageProps) {
  const originalUri = getSourceUri(source);

  let resolvedSource = source;
  if (originalUri && typeof source === 'object' && source && !Array.isArray(source)) {
    const uri = thumbnail
      ? getProductThumbnailUrl(originalUri)
      : getProductFullUrl(originalUri);
    resolvedSource = { ...source, uri: uri ?? originalUri };
  }

  return (
    <Image
      {...props}
      source={resolvedSource}
      cachePolicy={cachePolicy}
      recyclingKey={recyclingKey ?? originalUri}
    />
  );
}
