type ImageOptimizeOptions = {
  maxWidth: number;
  maxHeight: number;
  quality?: number;
  outputType?: 'image/webp' | 'image/jpeg';
};

type OptimizedStorageImage = {
  file: File | Blob;
  contentType: string;
  extension: string;
  originalSize: number;
  optimizedSize: number;
  wasOptimized: boolean;
};

export const STORAGE_IMAGE_CACHE_CONTROL = '31536000';

export const PRODUCT_IMAGE_OPTIONS: ImageOptimizeOptions = {
  maxWidth: 900,
  maxHeight: 900,
  quality: 0.78,
};

export const PRODUCT_THUMBNAIL_OPTIONS: ImageOptimizeOptions = {
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.65,
  outputType: 'image/webp',
};

export const CATEGORY_IMAGE_OPTIONS: ImageOptimizeOptions = {
  maxWidth: 640,
  maxHeight: 640,
  quality: 0.82,
};

export const BANNER_IMAGE_OPTIONS: ImageOptimizeOptions = {
  maxWidth: 1600,
  maxHeight: 700,
  quality: 0.82,
};

function getImageExtension(contentType: string, fileName?: string) {
  if (contentType === 'image/webp') return 'webp';
  if (contentType === 'image/jpeg') return 'jpg';
  if (contentType === 'image/png') return 'png';

  const extension = fileName?.split('.').pop()?.toLowerCase();
  return extension && extension.length <= 5 ? extension : 'jpg';
}

function replaceImageExtension(fileName: string, extension: string) {
  const normalized = fileName.replace(/\.[^.]+$/, '');
  return `${normalized}.${extension}`;
}

function canOptimizeImage(input: File | Blob) {
  const type = input.type.toLowerCase();
  return type.startsWith('image/') && type !== 'image/svg+xml' && type !== 'image/gif';
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function loadImage(input: Blob): Promise<CanvasImageSource & { close?: () => void }> {
  if ('createImageBitmap' in window) {
    return window.createImageBitmap(input);
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(input);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to decode image'));
    };
    image.src = objectUrl;
  });
}

function getImageDimensions(image: CanvasImageSource) {
  if ('width' in image && 'height' in image) {
    return {
      width: Number(image.width),
      height: Number(image.height),
    };
  }

  return {
    width: 1,
    height: 1,
  };
}

export async function optimizeImageForStorage(
  input: File | Blob,
  options: ImageOptimizeOptions
): Promise<OptimizedStorageImage> {
  const originalName = input instanceof File ? input.name : 'image';
  const originalType = input.type || 'image/jpeg';

  if (!canOptimizeImage(input)) {
    return {
      file: input,
      contentType: originalType,
      extension: getImageExtension(originalType, originalName),
      originalSize: input.size,
      optimizedSize: input.size,
      wasOptimized: false,
    };
  }

  let image: (CanvasImageSource & { close?: () => void }) | null = null;

  try {
    image = await loadImage(input);
    const { width, height } = getImageDimensions(image);
    const scale = Math.min(1, options.maxWidth / width, options.maxHeight / height);
    const targetWidth = Math.max(1, Math.round(width * scale));
    const targetHeight = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      throw new Error('Canvas is not available');
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, targetWidth, targetHeight);

    const outputType = options.outputType ?? 'image/webp';
    const optimizedBlob = await canvasToBlob(canvas, outputType, options.quality ?? 0.82);

    if (!optimizedBlob || (optimizedBlob.size >= input.size && scale === 1)) {
      return {
        file: input,
        contentType: originalType,
        extension: getImageExtension(originalType, originalName),
        originalSize: input.size,
        optimizedSize: input.size,
        wasOptimized: false,
      };
    }

    const extension = getImageExtension(outputType, originalName);
    const optimizedFile =
      typeof File !== 'undefined'
        ? new File([optimizedBlob], replaceImageExtension(originalName, extension), {
            type: outputType,
            lastModified: Date.now(),
          })
        : optimizedBlob;

    return {
      file: optimizedFile,
      contentType: outputType,
      extension,
      originalSize: input.size,
      optimizedSize: optimizedBlob.size,
      wasOptimized: true,
    };
  } catch (error) {
    console.warn('Image optimization skipped:', error);
    return {
      file: input,
      contentType: originalType,
      extension: getImageExtension(originalType, originalName),
      originalSize: input.size,
      optimizedSize: input.size,
      wasOptimized: false,
    };
  } finally {
    image?.close?.();
  }
}

export function createStorageImageName(extension: string) {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
}
