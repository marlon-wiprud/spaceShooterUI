import { sign } from "crypto";
import { ethers } from "ethers";

export const isMetamaskInstalled = (): boolean => {
    // @ts-ignore
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
        return true
    }
    return false
}

export const metamaskLogin = async (): Promise<string> => {
    console.log("logging in..")
    // @ts-ignore
    const { ethereum } = window
    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" })
        const account = accounts[0]
        return account
    } catch (err) {
        console.error("unable to connect the metamask: ", err)
        return ""
    }
}

export const metamaskSignMessage = async (message: string) => {
    try {

        // @ts-ignore
        const { ethereum } = window
        await ethereum.enable();
        let provider = new ethers.providers.Web3Provider(ethereum)
        return await provider.getSigner().signMessage(message)

    } catch (err: any) {
        throw new Error(err.message)
    }

}