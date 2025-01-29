import {Artwork} from "~/Entities/Artwork";

export interface ArtworkProps {
    artwork: Artwork;
}

export function ArtworkThumbnail({artwork}: ArtworkProps) {
    return(<>
            <div className="thumbnail-wrapper flex-col">
                <div className="max-w-40 max-h-40 m-2">
                    <img className="w-" src={artwork.image} alt={artwork.name} />
                </div>

                <div className="m-2 text-center">
                    {artwork.name}
                </div>

                <div className="text-center italic text-xs">
                    By {artwork.artist}
                </div>
            </div>
    </>)
}

export interface ArtworkListProps {
    artworks: Artwork[];
}

export function ArtworkThumbnailList({artworks}: ArtworkListProps) {
    return(<>

    </>)
}