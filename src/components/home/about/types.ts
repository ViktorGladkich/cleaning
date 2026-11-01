export interface GalleryCardConfig {
  id: number;
  wrapperClass: string;
  maskClass: string;
  imageClass: string;
  aspectClass: string;
  widthClass: string;
  initialClipPath: string;
  finalClipPath: string;
  src: string;
  alt: string;
  sizes: string;
  startTime: number;
  duration?: number;
  isCenter?: boolean;
  parallaxY?: number;
  parallaxScale?: number;
}
