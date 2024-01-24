export type NewsDTO = {
    id: number;
    createdOn: string;
    title: string;
    author: string;
    text: string;
    mainImage: string;
    images: {
        imageName: string;
        imageLink: string;
    }[];
    keywords: string;
    link: string;
    active: boolean;
}