const apiKey = "AIzaSyAdLv33mbEvufiC5wV4TnE6S3xBnJ38loE";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// See https://developers.google.com/apps-script/guides/properties
// for instructions on how to set the API key.
// const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

async function runChat(prompt) {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: 'text/plain',
  };

  const data = {
    generationConfig,
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
        ],
      },
    ],
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return;
    }

    const responseData = await response.json();
    const answer=responseData["candidates"][0]["content"]["parts"][0].text
    console.log(JSON.stringify(answer, null, 2)); // Pretty print the JSON response
    return answer;
  } catch (error) {
    console.error("There was an error sending the request:", error);
  }
}

export default runChat;