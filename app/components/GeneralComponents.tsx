import {useState} from "react";

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

interface ButtonProps {text: string; href: string;}
export const Button = ({ text, href }: ButtonProps) => {
    return(
        <>
            <div className="button">
                <a href={href}>{text}</a>
            </div>
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
    value: string
}
export const InputText = ({label, name, value} : InputTextProps) => {
    const [inputValue, setInputValue] = useState(value);

    return (<div className="input-text-container">
        <div className="label">{label}</div>
        <input
            className="input-text"
            name={name}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    </div>)
}