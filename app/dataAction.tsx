import {mock_db_artworks} from "~/resources/data/FakeData";

// TODO: Implement Database instead of using mock data

export function findArtwork(id: number) {
    return mock_db_artworks.find(artwork => artwork.id === id);
}

export function getArtworksByTags(tagList : string[]) {
    return mock_db_artworks.filter(artwork => tagList.every(tag => artwork.tags.includes(tag)));
}

export function getArtworksByArtist(artist : string) {
    return mock_db_artworks.filter(artwork => artwork.artist === artist);
}

export function getArtworksByName(search : string) {
    return mock_db_artworks.filter(artwork => artwork.name.includes(search));
}

export function getAllArtists() {
    return mock_db_artworks.map(artwork => artwork.artist);
}

export interface ArtworkSearchProps {
    search : string,
    type: string,
    sliceStart? : number,
    maxItems? : number,
}
export function searchArtworks(props : ArtworkSearchProps) {
    console.log(props);

    let result = mock_db_artworks;

    props.type = props.type.toLowerCase(); // Make the type not case-sensitive

    switch(props.type) {
        case("artist"): result = getArtworksByArtist(props.search); break;
        case("tags"): result = getArtworksByTags(props.search.split(",")); break;
        case("name"): result = getArtworksByName(props.search); break;
    }

    // Set undefined props to default values
    if(props.sliceStart === undefined) props.sliceStart = 0;
    if(props.maxItems === undefined) props.maxItems = result.length;

    const totalArtworks = result.length;

    result = result.slice(props.sliceStart, props.sliceStart + props.maxItems);

    return {totalArtworks, artworks:result};

}