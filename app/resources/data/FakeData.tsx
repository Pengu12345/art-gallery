import {Artwork} from "~/entities/Artwork";

export const mockArtwork : Artwork = {
    id: 1,
    name: "Art Title",
    description: "Lorem Ipsum",
    tags: ["tag1", "tag2", "tag3"],
    image:"/img/cat-stare.jpg",
    artist:"Amazing Artist"
}

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