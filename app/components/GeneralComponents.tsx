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
}
export const Button = ({ text, href, onClick }: ButtonProps) => {
    return(
        <div className="button">
            <Link to={href?href:''} onClick={onClick} preventScrollReset >
                <div> {text} </div>
            </Link>
        </div>
    )
}

interface FormButtonProps {
    text: string,
    name: string,
    value: string | number,
    className?:string,
    onClick?: () => void,
    disabled?: boolean,
}
export const FormButton = (props : FormButtonProps) => {
    return(
        <>
            <button
                type="submit"
                className={props.className}
                name={props.name}
                onClick={props.onClick}
                disabled={props.disabled}
                value={""+props.value}> {props.text} </button>
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