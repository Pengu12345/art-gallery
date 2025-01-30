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
    maxItems?: number;
}

export function ArtworkThumbnailList({artworks, maxItems}: ArtworkListProps) {
    return(<>
        <div className="section-search thumbnail-list">
            {
                artworks.map((artwork, id) => (<>
                    {!maxItems && <ArtworkThumbnail artwork={artwork} />}
                    {maxItems  && id < maxItems && <ArtworkThumbnail artwork={artwork} />}
                    </>)
                )
            }
        </div>
    </>)
}

export function ArtworkThumbnailGrid({artworks, maxItems}: ArtworkListProps) {
    return(<>
        <div className="section-search thumbnail-grid">
            {
                artworks.map((artwork, id) => (<>
                    {!maxItems && <ArtworkThumbnail artwork={artwork} />}
                    {maxItems  && id < maxItems && <ArtworkThumbnail artwork={artwork} />}
                    </>)
                )
            }
        </div>
    </>)
}