import "./message.css";

export interface MessageProps {
    message: Record<string, any>;
}

export const Message = ({ message }: MessageProps) => {
    return (
        <div className={((message.is_own_msg as boolean) ? "outgoing" : "incoming") + " msg-container"}>
            <div className="msg-header">{message.username}</div>
            <div className="msg-body">{message.msg}</div>
            <div className="msg-footer">{(message.date as Date).toISOString()}</div>
        </div>
    )
}
