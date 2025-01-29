import type { MetaFunction } from "@remix-run/node";
import {ArtworkThumbnail} from "~/Components/ArtworkComponent";
import {mockArtwork} from "~/resources/data/FakeData";
import {TitleText} from "~/Components/GeneralComponents";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
    return (<div>
            <TitleText title={"Most Recent Artworks: "} />
            <div className="section-search card thumbnail-list">
                    <ArtworkThumbnail artwork={mockArtwork}/>
                    <ArtworkThumbnail artwork={mockArtwork}/>
                    <ArtworkThumbnail artwork={mockArtwork}/>
            </div>
    </div>);
}