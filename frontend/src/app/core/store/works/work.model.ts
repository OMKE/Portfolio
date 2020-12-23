export interface Work {
    id: number;
    themeId: number;
    title: string;
    description: string;
    image: string;
    websiteUrl: string | null;
    sourceCodeUrl: string | null;
    videoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}
