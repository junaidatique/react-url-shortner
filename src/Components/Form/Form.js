import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import "./Form.css";
export default function Form(params) {
  const [link, setLink] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = value => {
    const validURL = validator.isURL(url, {
      require_protocol: true
    });
    if (!validURL) {
      setError('Please ensure the url is correct and includes the http(s) protocol.');
    } else {
      setError("")
      console.log('URL is: ', url);
      // Post values
      axios.post(`${process.env.REACT_APP_API_URL}`, {
        LongURL: url
      })
        .then(res => {
          console.log("Form -> res", res)
          setLink(`${process.env.REACT_APP_BASE_URL}/${res.ShortLink}`)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }



  return (
    <div className="body-wrap">
      <header>
        <h1>Link Shortener</h1>
      </header>
      <main>
        <form>
          {error &&
            <div className="error">{error}</div>
          }
          <fieldset>
            <input type="text" name="url" placeholder="Enter URL including the http(s) protocol" onChange={e => setUrl(e.target.value)} />
            <input type="button" value="shorten" onClick={e => handleSubmit()} />
          </fieldset>
          <br />
          <fieldset className={link !== '' ? 'display-result' : 'hide-result'}>
            <span id="result">{link}</span>
          </fieldset>
        </form>
      </main>
    </div>
  )
}