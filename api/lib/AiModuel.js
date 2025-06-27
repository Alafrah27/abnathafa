import dotenv from "dotenv";
dotenv.config();
export const AiModuel = async (text) => {
  const body = {
    contents: [
      {
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in AiModuel:", error);
    throw error; // Re-throw the error so the handler can catch it
  }
};
