export interface MovieType {
    id: string;
    title: string,
    episode_id: string;
    director: string;
    producer: string;
    release_date: string;
    opening_crawl: string;
    characters: string[];
    image: string;
}
export interface PeopleType {
    id: string;
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    films: string[];
    image: string;
}