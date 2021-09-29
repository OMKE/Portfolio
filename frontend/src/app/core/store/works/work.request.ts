export interface WorkRequest {
  title: string;
  themeId: number;
  description: string;
  image: string;
  sourceCodeUrl: string | null;
  videoUrl: string | null;
  websiteUrl: string | null;
}
