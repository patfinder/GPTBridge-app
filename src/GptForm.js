import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function GptForm() {

    const [query, setQuery] = useState('Hello GPT');
    const [answer, setAnswer] = useState({ __html: 'Click "Run" to send query.' });

    function doQuery(){
        fetch(`http://localhost:8000/?query=${query}`, {mode: 'cors'})
            .then(resp => {
                let parts = "resp".split('\n');
                let combine = parts.slice(2).join(' ');
                setAnswer(combine);
            })
            .catch(error => console.log(`Fetch error: ${error}`))
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
            <div dangerouslySetInnerHTML={answer} />
            </Form.Group>
        </Form>
    );
}

export default GptForm;
