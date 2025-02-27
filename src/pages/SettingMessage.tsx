import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlexMessage } from "../types/Message";
import { useLiffContext } from "../utils/LiffProvider";

const apiUrl = import.meta.env.VITE_API_URL;

function SettingMessage() {
    const [jsonData, setJsonData] = useState<FlexMessage>();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data, "onSubmit");

    const { userData } = useLiffContext();

    useEffect(() => {
        // 靜態檔案不能透過import引入，所以使用fetch
        fetch('/JSON/default-message.json')
            .then(response => response.json())
            .then(data => {
                setJsonData(data);
                console.log(data);
            })
            .catch(error => console.error('Error loading JSON:', error));
    }, []);

    const sendDefaultMessage = async () => {
        const message = {
            to: userData?.profile?.userId,
            messages: [jsonData],
        }
        try {
            console.log(message, "預設訊息", apiUrl);
            const response = await axios.post(`${apiUrl}/webhook/send-flex-message`, JSON.stringify(message));
            console.log(response.data, "回傳資料");
        } catch (error) {
            console.error("前端錯誤", error);
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