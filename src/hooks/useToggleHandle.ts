import { useState } from "react";

function useToggleHandle(initState: boolean): [boolean, () => void] {
    const [isOpen, setIsOpen] = useState(initState);
    const handleModal = () => {
        setIsOpen(!isOpen);
    };
    return [isOpen, handleModal];
}
export default useToggleHandle