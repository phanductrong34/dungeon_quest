import { toNumber } from "@vue/shared"

const utils = {
    toPixels(n){
        return (n * 16)
    },
    toNumber(px){
        return (px / 16)
    }
}

export default utils