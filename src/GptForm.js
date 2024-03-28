import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

function GptForm() {

    const [query, setQuery] = useState('Hello GPT');
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState({ __html: 'Click "Run" to send query.' });

    function doQuery(event){

        setLoading(true);

        let host = window.location.host

        fetch(`//${host}/?query=${query}`, {mode: 'cors'})
            .then(resp => resp.text())
            .then(text => setAnswer({ __html: text }))
            .catch(error => console.log(`Fetch error: ${error}`))
            .finally(() => setLoading(false));
        
        event.preventDefault();
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Query</Form.Label>
            <Form.Control placeholder="Enter query" 
                value={query} onChange={e => setQuery(e.target.value)} />
            <Button variant="primary" type="submit" onClick={doQuery}>Run</Button>
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
