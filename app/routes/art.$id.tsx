import {loaders} from "@remix-run/dev/dist/compiler/utils/loaders";
import { json } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Button, TextElement} from "~/components/GeneralComponents";
import {findArtwork} from "~/dataAction";


export async function loader({params}:  any) {
    return json({
        id: params.id
    })
}

export default function Art() {

    const data = useLoaderData<typeof loader>();

    const id = data.id;

    console.log(id);

    const artwork = findArtwork(parseInt(id));

    if (!artwork) {
        return <div>Art not found</div>
    }

    return (<>
            <Button text="Return to gallery" href="/gallery" />

            <div className="art-container">
                <div className="art-image-container">
                    <img className="" src={artwork.image} alt={artwork.name} />
                </div>
                <div className="mt-2 mb-2">
                    <div className="font-bold text-3xl text-center"> {artwork.name}</div>
                </div>

                <div className="art-description-container">
                    <TextElement text={artwork.description} />
                </div>

                <span> Tags: </span>
                <div className="art-tags-container">
                    {artwork.tags.map((tag) => (<>
                        <div className="tag">{tag}</div>
                    </>))}
                </div>
            </div>
        </>)
}