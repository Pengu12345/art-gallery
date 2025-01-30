import {Artwork} from "~/entities/Artwork";

export const mockArtwork : Artwork = {
    id: 1,
    name: "Art Title",
    description: "Lorem Ipsum",
    tags: ["tag1", "tag2", "tag3"],
    image:"/img/cat-stare.jpg",
    artist:"Amazing Artist"
}

/*
export const mock_db_artworks : Artwork[] = [
    {
        id: 1,
        name: "Staring cat",
        description: "Lorem Ipsum 1",
        tags: ["funny", "animal"],
        image:"/img/cat-stare.jpg",
        artist:"Anonymous"
    },
    {
        id: 2,
        name: "Baba is you",
        description: "Lorem Ipsum 2",
        tags: ["animal", "background"],
        image:"/img/baba.png",
        artist:"Hempuli"
    },
    {
        id: 3,
        name: "Jerma",
        description: "Lorem Ipsum 3",
        tags: ["funny", "jerma", "animal"],
        image:"/img/jerma.png",
        artist:"Jerma"
    }
]
*/


const randomNames = ["Sunset Bliss", "Ocean's Depth", "Abstract Horizon", "Floral Symphony", "Urban Lights"];
const randomTags = ["modern", "abstract", "classic", "vintage", "animal", "portrait", "landscape"];
const randomArtists = ["Artist A", "Artist B", "Artist C", "Artist D", "Artist E"];

function generateRandomArtwork(id: number): Artwork {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomTagCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1; // 1 to 3 tags
    const randomTagsSelected = Array.from({length: randomTagCount}, () => randomTags[Math.floor(Math.random() * randomTags.length)]);
    const randomArtist = randomArtists[Math.floor(Math.random() * randomArtists.length)];
    const randomImage = `/img/artwork-${id}.jpg`;

    return {
        id,
        name: randomName,
        description: "Generated artwork description.",
        image: randomImage,
        artist: randomArtist,
        tags: randomTagsSelected
    };
}

export let mock_db_artworks: Artwork[] = []

Array.from({length: 50}, (_, idx) => {
    mock_db_artworks.push(generateRandomArtwork(idx + 1));
});
