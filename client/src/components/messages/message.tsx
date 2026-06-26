import "./message.css";

export interface MessageProps {
    msg: string;
    name: string;
    user_id: number;
    date: Date;
    is_own_msg?: boolean;
}

export const Message = ({ msg, name, user_id, date, is_own_msg }: MessageProps) => {
    return (
        <div className={(is_own_msg ? "outgoing" : "incoming") + " msg-container"}>
            <div className="msg-header">{name}</div>
            <div className="msg-body">{msg}</div>
            <div className="msg-footer">{date.toISOString()}</div>
        </div>
    )
}
