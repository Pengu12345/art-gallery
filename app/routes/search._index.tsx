import {ActionFunctionArgs, json} from "@remix-run/node";
import {useActionData, useLoaderData} from "@remix-run/react";
import {loader} from "~/routes/art.$id";
import {Button, InputText, RadioGroup} from "~/components/GeneralComponents";
import {ArtworkThumbnailList} from "~/components/ArtworkComponent";
import {Artwork} from "~/entities/Artwork";
import {getArtworksByArtist, getArtworksBySearch, getArtworksByTags} from "~/dataAction";

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

    let selectedId = 0;
    if(data) {
        if(data.type == 'Name') {
            selectedId = 0;
            artworks = getArtworksBySearch(data.search);
        }
        if(data.type == 'Artist') {
            selectedId = 1;
            artworks = getArtworksByArtist(data.search);
        }
        if(data.type == 'Tags') {
            const tags = data.search.split(' ');
            artworks = getArtworksByTags(tags);
            selectedId = 2;
        }
    }


    return(<>
        <Button text="Return to gallery" href="/gallery" />

        <div className="section-search">
            <form method="post">
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

                {data &&
                    <ArtworkThumbnailList artworks={artworks} />
                }
                {data == undefined && <div className="italic"> Please make a search...</div>}
            </form>
        </div>
    </>)
}