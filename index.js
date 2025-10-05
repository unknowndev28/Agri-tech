import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey: GOOGLE_API_KEY });


// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Routes ---
app.get('/', (req, res) => res.render('index', { title: 'Home Page | AgriTech' }));
app.get('/index', (req, res) => res.render('index', { title: 'Home Page | AgriTech' }));

app.get('/plant-disease-identify', (req, res) => res.render('plant-disease-identify'));
app.get('/plant-disease-results', (req, res) => res.render("plant-disease-results"));
app.get("/buy-crops", (req, res) => res.render("buy-crops", { responseText: "" }));
app.get("/smart-farming", (req, res) => res.render("smart-farming", { responseText: "" }));
app.get("/crops-chat", (req, res) => res.render("plant-ask-us", { responseText: "" }));
app.get("/stock-identification", (req, res) => res.render("stock-identification", { responseText: "" }));
app.get("/milk-calculator", (req, res) => res.render("milk-calculator", { responseText: "" }));
app.get("/smart-farming-result", (req, res) => res.render("smart-farming-result", { responseText: "" }));
app.get("/livestock-chat", (req, res) => res.render("livestock-chat", { responseText: "" }));
app.get("/livestock", (req, res) => res.render("livestock", { responseText: "" }));
app.get("/result-buy-crops", (req, res) => res.render("result-buy-crops", { responseText: "" }));
app.get("/crops", (req, res) => res.render("crops", { responseText: "" }));

// --- Upload Plant Disease ---
app.post('/upload-plant-disease', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  try {
    const image = await ai.files.upload({
      file: req.file.buffer,
      mimeType: req.file.mimetype,
      fileName: req.file.originalname,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: "Tell me what disease is the plant having and give response only in the object format containing multiple array with disease_name,symptoms,treatment"
            },
            {
              inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: req.file.mimetype
              }
            }
          ]
        }
      ]
    });

    const cleanJsonString = (input) => {
      return input.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
    };

    const json = cleanJsonString(response.text);
    let parsed = JSON.parse(json);
    const diseases = Array.isArray(parsed) ? parsed : [parsed];

    res.render('plant-disease-results', { img: null, diseases });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Upload Stock Identify ---
app.post('/upload-stock-identify', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  try {
    const image = await ai.files.upload({
      file: req.file.buffer,
      mimeType: req.file.mimetype,
      fileName: req.file.originalname
    });

    let language = req.body.language;
    const otherLanguage = req.body.other_language;

    if (language === 'other' && otherLanguage && otherLanguage.trim() !== '') {
      language = otherLanguage.trim();
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Don't give unnecessary text just tell me directly what breed is the following animal in ${language}`
            },
            {
              inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: req.file.mimetype
              }
            }
          ]
        }
      ]
    });

    res.render("stock-identification", { responseText: response.text });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// --- Buy Crops ---
app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  let responseText = "No response generated.";

  if (prompt) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `I am a farmer, if the following prompt :'${prompt}' is not about farm crops and plant then you must only reply with not answerable`
      });
      responseText = response;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      responseText = "Failed to get a response from the AI. Please try again.";
    }
  }

  const returned_text = responseText.candidates[0].content.parts[0].text;
  res.render('buy-crops', { responseText: returned_text });
});

// --- Ask Livestock ---
app.post('/ask-livestock', async (req, res) => {
  const prompt = req.body.prompt;
  let responseText = "No response generated.";

  if (prompt) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `I am a farmer, if the following prompt :'${prompt}' is not about farm animal then you must only reply with not answerable`
      });
      responseText = response;
    } catch (error) {
      console.error("Error calling API:", error);
      responseText = "Failed to get a response from the AI. Please try again.";
    }
  }

  const returned_text = responseText.candidates[0].content.parts[0].text;
  res.render('livestock-chat', { responseText: returned_text });
});

// --- Milk Calculator ---
app.post('/calculate-milk', async (req, res) => {
  const { animalType, breed, age } = req.body;

  const prompt = `I am having animal ${animalType} with breed ${breed} and age ${age}. It is a female and currently lactating. How much milk will it produce? Just directly provide the value.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const returned_text = response.candidates[0].content.parts[0].text;
    res.render('milk-calculator', { responseText: returned_text });

  } catch (error) {
    console.error("API Error:", error);
    res.render('milk-calculator', { responseText: "Failed to get response from AI." });
  }
});

// --- Buy Crops Form ---
app.post('/buy-crops-form', async (req, res) => {
  const { district } = req.body;
  let responseText = "No response generated.";
  let locations = [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `I want to buy crop from District: ${district}. Give me nearby locations for buying crop and seed in the form of array: [name, address, mapurl] only.`
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    responseText = rawText;

    const match = rawText.match(/\[\s*\[[\s\S]*?\]\s*\]/);
    if (match) {
      const arrayOnly = match[0];
      locations = JSON.parse(arrayOnly);
    }

  } catch (error) {
    console.error("AI Error:", error);
  }

  res.render('result-buy-crops', { locations, responseText, district });
});

// --- Smart Farming Form ---
app.post('/smart-farming-form', async (req, res) => {
  const {
    country, state, city, landArea, unit, slope, soil, soilDesc,
    prevCrop, startDate, endDate, waterSource, otherWater, sunlight, additionalNotes
  } = req.body;

  const prompt = `
I am a farmer with the following conditions:
Country: ${country}
State: ${state}
City: ${city}
Land Area: ${landArea} ${unit}
Slope: ${slope}
Soil Type: ${soil}
Soil Description: ${soilDesc}
Previous Crop: ${prevCrop}
Planting Start Date: ${startDate}
Planting End Date: ${endDate}
Water Source: ${waterSource}
Other Water Details: ${otherWater}
Sunlight: ${sunlight}
Additional Notes: ${additionalNotes}

Tell me which plant I should grow for maximum profit.

Reply ONLY in JSON format like:
{
  "plant": "Name of Plant",
  "reasons": ["Reason 1", "Reason 2"],
  "bestway": ["Best practice 1", "Best practice 2"],
  "estimated profit": "₹4,00,000 per hectare"
}
`;

  function cleanAIResponse(text) {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanedText = cleanAIResponse(rawText);
    let parsedResult = JSON.parse(cleanedText);

    res.render('smart-farming-result', {
      responseText: JSON.stringify(parsedResult)
    });

  } catch (error) {
    console.error('Smart Farming Error:', error);
    res.render('smart-farming-result', {
      responseText: JSON.stringify({ error: 'Failed to get a response from AI.' })
    });
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});