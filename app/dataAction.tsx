import {mock_db_artworks} from "~/resources/data/FakeData";

// TODO: Implement Database instead of using mock data

export function findArtwork(id: number) {
    return mock_db_artworks.find(artwork => artwork.id === id);
}

export function getArtworksByTags(tagList : string[]) {
    return mock_db_artworks.filter(artwork => artwork.tags.some(tag => tagList.includes(tag)));
}

export function getArtworksByArtist(artist : string) {
    return mock_db_artworks.filter(artwork => artwork.artist === artist);
}

export function getArtworksBySearch(search : string) {
    return mock_db_artworks.filter(artwork => artwork.name.includes(search));
}

export function getAllArtists() {
    return mock_db_artworks.map(artwork => artwork.artist);
}