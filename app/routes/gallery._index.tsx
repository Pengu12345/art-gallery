import type { MetaFunction } from "@remix-run/node";
import {ArtworkThumbnail, ArtworkThumbnailList} from "~/components/ArtworkComponent";
import {Button, TitleTextElement} from "~/components/GeneralComponents";
import {Artwork} from "~/entities/Artwork";
import {mock_db_artworks} from "~/resources/data/FakeData";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {

    const mockArtworks : Artwork[] = mock_db_artworks;

    return (<div>
            <TitleTextElement title={"Most Recent Artworks: "} />
            <ArtworkThumbnailList artworks={mockArtworks} />

            <Button href={"./search"} text={"Search"}/>
    </div>);
}