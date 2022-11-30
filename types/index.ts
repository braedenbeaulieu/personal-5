export { };

declare global {
    interface PortfilioItem {
        id: number,
        title: string,
        link: string,
        description: string,
        folder_colour?: string
    }
}