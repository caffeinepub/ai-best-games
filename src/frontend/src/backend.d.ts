import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Game {
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    rating: number;
    releaseYear: number;
    developer: string;
}
export interface backendInterface {
    filterByGenre(genre: string): Promise<Array<Game>>;
    getAllGames(): Promise<Array<Game>>;
    getPickOfTheDay(): Promise<Game>;
    searchByTitle(searchTerm: string): Promise<Array<Game>>;
}
