import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { FlexMessage } from "../types/Message";

const apiUrl = import.meta.env.VITE_API_URL;

function SettingMessage() {
    const [jsonData, setJsonData] = useState<FlexMessage>();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    // 靜態檔案不能透過import引入，所以使用fetch
    fetch('/JSON/default-message.json')
        .then(response => response.json())
        .then(data => {
            setJsonData(data);
            console.log(data);
        })
        .catch(error => console.error('Error loading JSON:', error));

    const sendDefaultMessage = async () => {
        try {
            const response = await axios.post(`${apiUrl}/webhook/send-flex-message`, jsonData);
            console.log(jsonData, "預設訊息");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button type="button" onClick={() => sendDefaultMessage()}>發送預設訊息</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("example", { required: true })} />
                {errors.example && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </>
    );
}
interface Inputs {
    example: string;
}
export default SettingMessage;