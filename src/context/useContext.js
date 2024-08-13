import { useContext } from "react"
import { EasyContext } from "./context"

export const useEasyContext = () => {
    return useContext(EasyContext);
}