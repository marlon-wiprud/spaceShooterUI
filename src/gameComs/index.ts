
export interface Action<T> {
    channel: string
    type: string
    payload: T
}

const CHANNEL = "space_shooter"

export interface ActionLogin {
    address: string;
    authToken: string;
}

export const ACTION_READY = "READY"
export const ACTION_LOGIN = "LOGIN"

export const newActionLogin = (address: string, authToken: string): Action<ActionLogin> => ({
    channel: CHANNEL,
    type: ACTION_LOGIN,
    payload: { address, authToken }
})

export const deliverAction = (a: Action<any>) => {
    const frameEl = document.getElementById("gameFrame") as HTMLIFrameElement;
    if (frameEl && frameEl.contentWindow) {
        frameEl.contentWindow.postMessage(JSON.stringify(a), "*");
    } else {
        console.error("unable to deliver action: ", a)
    }
}

export const maybeParse = (strMsg: string): Action<any> | null => {
    try {
        const msg = JSON.parse(strMsg) as Action<any>
        if (msg.channel && msg.channel === CHANNEL) {
            return msg
        }
        return null
    } catch (err) {
        return null
    }
}