import {
    useEffect,
    useState
} from 'react';
import './App.css'

function App() {
    const [data, setData] = useState("")

    useEffect(() => {
        fetch("http://localhost:8000")
            .then(res => res.json())
            .then(d => {
                setData(JSON.stringify(d, null, 2));
            });
    }, [])

    return (
        <>
            <div>This is a test</div>
            <div>{data}</div>
        </>
    )
}

export default App
