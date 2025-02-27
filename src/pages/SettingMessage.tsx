import { useForm, SubmitHandler } from "react-hook-form";
import defaultMessage from "./JSON/default-message.json";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const sendDefaultMessage = async () => {
    try {
        const response = await axios.post(`${apiUrl}/webhook/send-flex-message`, defaultMessage);
        console.log(defaultMessage, "預設訊息");
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

function SettingMessage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
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