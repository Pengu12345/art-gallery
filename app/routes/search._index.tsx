import {ActionFunctionArgs, json, LoaderFunctionArgs} from "@remix-run/node";
import {useActionData, useLoaderData} from "@remix-run/react";
import {loader} from "~/routes/art.$id";
import {Button, InputText, RadioGroup} from "~/components/GeneralComponents";
import {ArtworkThumbnailGrid, ArtworkThumbnailList} from "~/components/ArtworkComponent";
import {Artwork} from "~/entities/Artwork";
import {getArtworksByArtist, getArtworksBySearch, getArtworksByTags} from "~/dataAction";
import {mock_db_artworks} from "~/resources/data/FakeData";
import {useState} from "react";

export interface SearchProps {
    searchData: string;
    type: string;
}

export interface SearchLoaderData {
    search : SearchProps;
    artworks: Artwork[];
}

// TODO: Pagination

// Returns artworks depending on what was requested. By default, displayEverything
export async function action({request}: ActionFunctionArgs) {
    const body = await request.formData();

    const data : SearchProps = {
        type: body.get('type') as string,
        searchData: body.get('search') as string
    }

    let artworks : Artwork[] = [];
    // Fill up the artworks
    switch (data.type) {
        case 'Name':
            artworks = getArtworksBySearch(data.searchData);
            break;
        case 'Artist':
            artworks = getArtworksByArtist(data.searchData);
            break;
        case 'Tags': {
            const tags = data.searchData.split(' ');
            artworks = getArtworksByTags(tags);
            break;
        }
    }

    return {search: data, artworks: artworks};
}

export const MAX_ITEMS_IN_PAGE = 8*3;

export default function Search() {
    // INITIALIZE DATA
    let data = useActionData<typeof action>() as SearchLoaderData | undefined;
    // If data is undefined, use default fields
    if (!data) {data = {
        search: {type: 'Name', searchData: '',}, artworks: mock_db_artworks};
    }
    //---

    const [page, setPage] = useState(0);
    const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>(data.artworks.slice(0, MAX_ITEMS_IN_PAGE));
    const [searchValue, setSearchValue] = useState(data.search.searchData);

    // Pagination settings
    const maxPage = Math.floor(data.artworks.length / MAX_ITEMS_IN_PAGE);

    const setPagination = (next_page : number)=>  {
        if(next_page < 0) next_page = 0;
        if(next_page > maxPage) next_page = maxPage;

        setPage(next_page);

        // Change displayed artworks depending on the page
        setDisplayedArtworks(
            data.artworks.slice(next_page * MAX_ITEMS_IN_PAGE, (next_page * MAX_ITEMS_IN_PAGE) + MAX_ITEMS_IN_PAGE)
        );
    }
    // ----
    // Type settings
    let selectedId = 0
    if (data.search.type === 'Name') selectedId = 0;
    if (data.search.type === 'Artist') selectedId = 1;
    if (data.search.type === 'Tags') selectedId = 2;
    // -----



    return(<>
        <Button text="Return to gallery" href="/gallery" />

        <div className="section-search">

            <div className="section-search-form">
                <form method="post">
                    <InputText
                        label={"Searching for: "}
                        name="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

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

                </form>

                <div className="flex flex-row space-x-2 items-center">
                    <Button text="<<" onClick={() => setPagination(0)} />
                    <Button text="<" onClick={() => setPagination(page - 1)} />
                    <p> {page+1} / {maxPage+1}</p>
                    <Button text=">" onClick={() => setPagination(page + 1)} />
                    <Button text=">>" onClick={() => setPagination(maxPage)} />

                    <p> Found {data.artworks.length} artworks. </p>
                </div>
            </div>

            <div className="section-search-results">
                {data &&
                    <ArtworkThumbnailGrid artworks={displayedArtworks} maxItems={MAX_ITEMS_IN_PAGE}/>
                }
            </div>
        </div>
    </>)

}