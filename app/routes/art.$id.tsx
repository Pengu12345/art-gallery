import {loaders} from "@remix-run/dev/dist/compiler/utils/loaders";
import {json, type MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {Button, TextElement} from "~/components/GeneralComponents";
import {findArtwork} from "~/dataAction";

export const meta: MetaFunction = () => {
    return [
        { title: "View artwork" },
    ];
};


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

                <div className="art-options-container">
                    <a className="button" href={artwork.image}> View full </a>
                </div>

                <div className="art-data-container">
                    <div className="title">{artwork.name}</div>

                    <div className="flex flex-row">
                        <div className="description flex-grow" >
                            <TextElement text={artwork.description} />
                        </div>

                        <div className="metadata">

                            <div className="flex flex-row gap-x-2">
                                Artist:
                                <form action={"/search/"} method="get">
                                    <input type="hidden" name="search" value={artwork.artist} />
                                    <input type="hidden" name="type" value="Artist" />
                                    <input type="submit" value={artwork.artist} className={"tag clickable underline"} />
                                </form>
                            </div>

                            <span> Tags: </span>
                            <div className="art-tags-container">
                                {artwork.tags.map((tag) => (<>
                                    <form action={"/search/"} method="get">
                                        <input type="hidden" name="search" value={tag} />
                                        <input type="hidden" name="type" value="Tags" />
                                        <input type="submit" value={tag} className={"tag clickable"} />
                                    </form>
                                </>))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>)
}