import { NextResponse } from 'next/server';

export async function POST() {
    try {        
        if (!process.env.OPENAI_API_KEY){
            throw new Error(`OPENAI_API_KEY is not set`);

        }
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions:"Start conversation with the user by saying 'Hello, how can I help you today?'",
                tools: tools,
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Return the JSON response to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}


const tools = [
    {
        "type": "function",
        "name": "getPageHTML",
        "description": "Gets the HTML for the current page",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "type": "function", 
        "name": "getWeather",
        "description": "Gets the current weather",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "type": "function",
        "name": "getCurrentTime",
        "description": "Gets the current time",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
];