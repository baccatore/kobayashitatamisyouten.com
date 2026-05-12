/* ===================================
   型定義
   =================================== */

/**
 * ページメタ情報
 */
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * お問い合わせフォームデータ
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

/**
 * サービス情報
 */
export interface Service {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

/**
 * 施工例情報
 */
export interface Work {
  title: string;
  category: string;
  images: string[];
  description: string;
  date?: string;
}

/**
 * お知らせ情報
 */
export interface News {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string;
}

/**
 * ナビゲーションメニュー項目
 */
export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

/**
 * パンくずリスト項目
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * LocalBusiness構造化データ
 */
export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image?: string;
  '@id'?: string;
  url: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs?: string[];
}

/**
 * BreadcrumbList構造化データ
 */
export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}
