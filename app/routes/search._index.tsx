import {ActionFunctionArgs, json} from "@remix-run/node";
import {useActionData, useLoaderData} from "@remix-run/react";
import {loader} from "~/routes/art.$id";
import {Button, InputText, RadioGroup} from "~/components/GeneralComponents";
import {ArtworkThumbnailGrid, ArtworkThumbnailList} from "~/components/ArtworkComponent";
import {Artwork} from "~/entities/Artwork";
import {getArtworksByArtist, getArtworksBySearch, getArtworksByTags} from "~/dataAction";
import {mockArtwork} from "~/resources/data/FakeData";

export interface SearchProps {
    search: string;
    type: string;
    page: number;
}

export async function action({request}: ActionFunctionArgs) {

    const body = await request.formData();

    const search = {
        type: body.get('type'),
        search: body.get('search'),
        page: body.get('page')
    }

    return json(search)
}

export default function Search() {

    const data = useActionData<typeof action>() as SearchProps;
    let artworks : Artwork[] = [];

    let page = 0;
    const artworkPerPage = 8 * 3;
    let totalPages = 0;

    let selectedId = 0;
    if(data) {
        switch (data.type) {
            case 'Name':
                selectedId = 0;
                artworks = getArtworksBySearch(data.search);
                break;
            case 'Artist':
                selectedId = 1;
                artworks = getArtworksByArtist(data.search);
                break;
            case 'Tags': {
                const tags = data.search.split(' ');
                artworks = getArtworksByTags(tags);
                selectedId = 2;
                break;
            }
        }

        page = data.page;
    }

    totalPages = Math.ceil(artworks.length / artworkPerPage);
    if(totalPages < 1) {totalPages = 1;}

    return(<>
        <Button text="Return to gallery" href="/gallery" />

        <div className="section-search">

            <div className="section-search-form">
                <form method="post">

                    <input type="hidden" name="page" value={page} />

                    <InputText label={"Searching for: "} name="search" value={data? data.search : ''} />
                    <div className="section-search-type">
                        <RadioGroup
                            label= "Search by: "
                            name="type"
                            values={['Name', 'Artist', 'Tags']}
                            selected={selectedId}
                        />
                    </div>

                    <button className="button" type="submit" value="Search"> Search </button>
                    <a className="button" href="/search"> Reset </a>

                    <p>Page: {parseInt(page) + 1 } out of {totalPages}</p>

                </form>
            </div>

            <div className="section-search-results">
                {data &&
                    <ArtworkThumbnailGrid artworks={artworks} maxItems={artworkPerPage}/>
                }
            </div>
        </div>
    </>)

}