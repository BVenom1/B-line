import React, { useEffect, useState } from 'react'
import "./message.css"
import { Message } from './message'

interface MessageBoxProps {
    user: Record<string, any>;
}

export const MessageBox = ({ user }: MessageBoxProps) => {
    const [msgs, setMsgs] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        const get_messages = async () => {
            const res = await fetch("http://localhost:8000/latest_messages");
            const result = await res.json();
            if (!res.ok) console.log("unable to fetch messages");
            else {
                const m = result as Record<string, any>[];
                const messages = m.map(g => {
                    return {
                        msg: g.msg,
                        username: g.username,
                        user_id: g.user_id,
                        date: new Date((g.timestamp as string).replace(" ", "T")),
                        is_own_message: g.username == user.name
                    }
                })
                console.log(messages)
                setMsgs(messages);
            }
        };
        get_messages();
    }, [])

    const onNewMessageSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const message: Record<string, any> = {
            msg: data.get('message')?.toString() ?? "",
            username: user.name,
            user_id: user.id,
            date: new Date(),
            is_own_msg: (msgs.length % 2) == 1
        };
        setMsgs(p => [...p, message]);
    }

    return (
        <div>
            <div className="msg_box">
                {msgs.map(m => (<Message message={m} />))}
            </div>
            <div className="new_msg">
                <form onSubmit={onNewMessageSubmit}>
                    <input
                        type="text"
                        id='newMessage'
                        name='message'
                        required
                        placeholder='Type your message here'
                    />
                </form>
            </div>
        </div>
    )
}
