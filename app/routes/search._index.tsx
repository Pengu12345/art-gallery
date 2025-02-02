import {ActionFunctionArgs, json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import {Form, useActionData, useLoaderData, useSearchParams} from "@remix-run/react";
import {Button, FormButton, InputText, RadioGroup} from "~/components/GeneralComponents";
import {ArtworkThumbnailGrid, ArtworkThumbnailList} from "~/components/ArtworkComponent";
import {Artwork} from "~/entities/Artwork";
import {getArtworksByArtist, getArtworksByName, getArtworksByTags, searchArtworks} from "~/dataAction";
import {mock_db_artworks} from "~/resources/data/FakeData";
import {useState} from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Search Index" },
    ];
};

export interface SearchProps {
    searchData: string;
    type: string;
}

export const MAX_ITEMS_IN_PAGE = 8*3;

export default function Search() {
    const [searchParams] = useSearchParams();
    
    const search = searchParams.get('search') || "";
    const type = searchParams.get('type') || "Name";
    const page = parseInt(searchParams.get('page') || "0");
    
    const [searchValue, setSearchValue] = useState(search);

    const {totalArtworks, artworks} = searchArtworks({
        search:search,
        type:type,
        sliceStart: page * MAX_ITEMS_IN_PAGE
    })

    // Pagination settings
    const maxPage = Math.floor(totalArtworks / MAX_ITEMS_IN_PAGE);

    // ----
    // Type settings
    let selectedId = 0
    if (type.toLowerCase() === 'name') selectedId = 0;
    if (type.toLowerCase() === 'artist') selectedId = 1;
    if (type.toLowerCase() === 'tags') selectedId = 2;
    // -----



    return(<>
        <Button text="Return to gallery" href="/gallery" />

        <div className="section-search">

            <div className="section-search-form">
                <form method="get" className="flex flex-col gap-y-2">
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

                    <div className="flex flex-row gap-x-2">
                        <input type="hidden" name="page" value={0} />
                        <button className="button" type="submit" value="Search"> Search </button>
                        <a className="button" href="/search"> Reset </a>
                    </div>
                </form>

                <div className="flex flex-row space-x-2 items-center">
                    {/* RENDER PAGINATION */}
                    <form method="get" className="flex flex-row gap-x-2 items-center">
                        <input type="hidden" name="search" value={search} />
                        <input type="hidden" name="type" value={type} />

                        {page > 0 && <FormButton className="button" text="<" name="page" value={page-1}/>}
                        <p> {page+1} / {maxPage+1}</p>
                        {page < maxPage&& <FormButton className="button" text=">" name="page" value={page+1}/>}
                        <p> Found {totalArtworks} artworks. </p>
                    </form>
                </div>

            </div>

            <div className="section-search-results">
                    <ArtworkThumbnailGrid artworks={artworks} maxItems={MAX_ITEMS_IN_PAGE}/>
            </div>
        </div>
    </>)

}