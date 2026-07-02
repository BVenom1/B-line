import { SignupLogin } from './components/signup_login/signup_login';
import { useState } from 'react';
import { MainPage } from './components/main_page/main_page';
import { Message } from './components/message/message';
import "./app.css";
import { MessageBox } from './components/message/message_box';

function App() {
    const [user, setUser] = useState<Record<string, any>>({});

    const onSuccessfulLogin = async (user: any) => {
        await setUser({ name: user.name, email: user.email, id: user.id });
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
            <MessageBox user={{ name: "name", email: "mail@mail.com", id: 4 }} />
        </div>
    )
}


export default App
