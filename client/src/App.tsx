import { SignupLogin } from './components/signup_login/signup_login';
import { useState } from 'react';
import { MainPage } from './components/main_page/main_page';
import { Message } from './components/messages/message';
import "./app.css";

function App() {
    const [user, setUser] = useState<Record<string, string>>({});

    const onSuccessfulLogin = async (name: string, email: string) => {
        await setUser({ name: name, email: email });
    }

    return (<>
        {Object.keys(user).length == 0
            ? <SignupLogin onSuccessfulLogin={onSuccessfulLogin} />
            : <MainPage user={user} />
        }
    </>)
}

export const Test = () => {
    return (
        <div className='test'>
            <div>Test</div>
            <Message msg='This is an incoming message' name='name' user_id={2} date={new Date()} />
            <Message msg='This is an outgoing message' name='name' user_id={2} date={new Date()} is_own_msg />
        </div>
    )
}


export default App
