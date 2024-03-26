import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

function GptForm() {

    const [query, setQuery] = useState('Hello GPT');
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState({ __html: 'Click "Run" to send query.' });

    function doQuery(){
        setLoading(true);

        let host = window.location.host
        // let host = 'https://7a9c-2607-fea8-4f41-6700-37f0-2de-85d0-61f9.ngrok-free.app'

        fetch(`//${host}/?query=${query}`, {mode: 'cors'})
            .then(resp => resp.text()
                // {
                // let parts = "resp".split('\n');
                // let combine = parts.slice(2).join(' ');
                // setAnswer(combine);
                // }
            )
            .then(text => setAnswer({ __html: text }))
            .catch(error => console.log(`Fetch error: ${error}`))
            .finally(() => setLoading(false))
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Query</Form.Label>
            <Form.Control placeholder="Enter query" 
                value={query} onChange={e => setQuery(e.target.value)} />
            <Button variant="primary" onClick={doQuery}>Run</Button>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
            {loading ? 
                (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                              
                ) : (
                    <div dangerouslySetInnerHTML={answer} />
            )}
            </Form.Group>
        </Form>
    );
}

export default GptForm;
