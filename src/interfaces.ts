export interface SignUp {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface SignIn {
  identifier: string;
  password: string;
}

export interface StrapiResponse {
  jwt: string;
  user: StrapiUser
}

export interface StrapiUser {
  name: string;
  surname: string;
  username: string;
  email: string;
  id: number;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  provider: string;
  updatedAt: string;
}

export interface StrapiPostCreated {
  Title: string;
  Content: string;
  locale?: string;
}

export interface StrapiPostsResponse {
  data: StrapiPost[],
  meta: {
    pagination?: {
      page: number,
      pageCount: number,
      pageSize: number,
      total: number
    }
  }
}

export interface StrapiPostResponse {
  data: StrapiPost,
  meta: {}
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      alternativeText: string;
      caption: string;
      createdAt: string;
      ext: string;
      formats: StrapiImage;
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string;
      provider: string;
      provider_metadata: {
        fileId: string;
      };
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    }
  }
}

export interface StrapiPost {
  attributes: {
    Content: string;
    Thumbnail: StrapiImage;
    Title: string;
    createdAt: string
    locale: string
    publishedAt: string;
    updatedAt: string;
    author?: {
      data: {
        id?: number | null;
        attributes?: StrapiUser | null;
      }
    }
  },
  id: number
}

export interface StrapiLocale {
  code: string;
  createdAt: string;
  id: number;
  isDefault: boolean;
  name: string;
  updatedAt: string;
}
