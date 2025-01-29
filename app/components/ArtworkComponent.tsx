import {Artwork} from "~/entities/Artwork";

export interface ArtworkProps {
    artwork: Artwork;
}

export function ArtworkThumbnail({artwork}: ArtworkProps) {
    return(<>
        <a href={"/art/" + artwork.id} className="thumbnail-link">
            <div className="thumbnail-wrapper">
                <div className="thumbnail-image">
                    <img src={artwork.image} alt={artwork.name} />
                </div>

                <div className="m-2 text-center">
                    {artwork.name}
                </div>

                <div className="italic text-xs m-2 text-center">
                    By {artwork.artist}
                </div>
            </div>
        </a>
    </>)
}

export interface ArtworkListProps {
    artworks: Artwork[];
}

export function ArtworkThumbnailList({artworks}: ArtworkListProps) {
    return(<>
        <div className="section-search thumbnail-list">
            {
                artworks.map((artwork) => (<>
                    <ArtworkThumbnail artwork={artwork} />
                    </>)
                )
            }
        </div>
    </>)
}