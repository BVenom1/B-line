import React, { useState } from 'react'
import "./message.css"
import { type MessageProps, Message } from './message'

export const MessageBox = () => {
    const [msgs, setMsgs] = useState<MessageProps[]>([]);

    const onNewMessageSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const message: MessageProps = {
            msg: data.get('message')?.toString() ?? "",
            name: 'placeholder',
            user_id: 0,
            date: new Date(),
            is_own_msg: (msgs.length % 2) == 1
        };
        setMsgs(p => [...p, message]);
    }

    return (
        <div>
            <div className="msg_box">
                {msgs.map(m => (<Message {...m} />))}
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
