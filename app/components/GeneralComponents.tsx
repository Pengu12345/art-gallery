import {useState} from "react";
import {Link} from "@remix-run/react";

interface TextElementProps {text: string;}
export const TextElement = ({ text }: TextElementProps) => {
    return (<>
        <p>{text}</p>
    </>)
}

interface TitleTextPropsElement {title: string;}
export const TitleTextElement = ({ title }: TitleTextPropsElement) => {
    return (<>
        <h1>{title}</h1>
    </>)
}

interface ButtonProps {
    text: string,
    href?: string,
    onClick?: () => void,
    disabled?: boolean,
}
export const Button = ({ text, href, onClick, disabled }: ButtonProps) => {
    return(
        <>
            <Link to={href?href:''} onClick={onClick} preventScrollReset >
                <div className="button"> {text} </div>
            </Link>
        </>
    )
}

interface RadioGroupProps {
    label : string
    name :string,
    values : string[],
    selected?: number
}
export function RadioGroup({label, name, values, selected}: RadioGroupProps) {

    const [selectedId, setSelectedId] = useState(selected ? selected : 0);

    return (<div className="flex flex-row space-x-2">
        <div className="label"> {label} </div>
        {
            values.map((value, id : number) => (<>
                {id == selectedId &&
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        onChange={() =>{}}
                        checked
                    />
                }
                {id != selectedId &&
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        onChange={() => setSelectedId(id)}
                    />
                }
                <label>{value}</label>
            </>))
        }
    </div>)
}

interface InputTextProps {
    label: string,
    name: string,
    value: string,
    onChange?: (v) => void
}
export const InputText = ({label, name, value, onChange} : InputTextProps) => {
    return (<div className="input-text-container">
        <div className="label">{label}</div>
        <input
            type="text"
            className="input-text"
            name={name}
            value={value}
            onChange={onChange}
        />
    </div>)
}