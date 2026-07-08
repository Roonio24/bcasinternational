import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: course matching with Gemini
  app.post("/api/match-courses", async (req, res) => {
    try {
      const { grades, fieldOfStudy, destination, budget, englishProficiency } = req.body;

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        // Return polished mock suggestions if key is missing or is the default placeholder
        return res.json({
          demo: true,
          courses: getDemoMatch(fieldOfStudy, destination, budget),
          explanation: "Displaying sample elite partner university placements matching your custom academic parameters (Demo Mode)."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are an expert academic admissions advisor for BCAS International, a premium global student recruitment agency.
Analyze the following student academic profile and match them with exactly 4 realistic university courses in their desired destination that fit their grades and budget.

STUDENT PROFILE:
- Academic Qualifications/Grades: ${grades}
- Desired Field of Study: ${fieldOfStudy}
- Preferred Study Destination: ${destination}
- Budget Level: ${budget}
- English Language Proficiency: ${englishProficiency}

Format the response EXACTLY as a JSON object with a single "courses" array.
Each course in the array MUST contain:
1. "id" (string, a unique string like "uni-course-id")
2. "universityName" (string, name of the institution)
3. "courseName" (string, e.g., BSc (Hons) Cyber Security or MSc Business Analytics)
4. "country" (string, e.g., United Kingdom)
5. "duration" (string, e.g., 3 Years / 4 Years with Placement)
6. "intake" (string, e.g., September / January)
7. "annualTuition" (string, e.g., £15,500 / AUD 31,000)
8. "estimatedLivingCost" (string, e.g., £10,000 / Year)
9. "entryRequirements" (string, academic criteria details matching their grades)
10. "englishRequirement" (string, e.g., IELTS 6.0 with no band less than 5.5)
11. "scholarshipAvailable" (string, e.g., £2,000 Merit Dean's Scholarship)
12. "reasonForMatch" (string, 2 sentences explaining why this suits their score, budget, and future career path)
13. "ranking" (string, e.g., Ranked Top 45 UK University)

Ensure the universities are realistic and match the destination:
- If destination is "United Kingdom", recommend standard high-recruiting universities such as Coventry University, University of West London, Cardiff Metropolitan University, University of Portsmouth, Leeds Beckett, etc.
- If destination is "Australia", recommend Universities like Deakin University, Swinburne University of Technology, University of Wollongong, Curtin, etc.
- If destination is "Canada", recommend colleges/universities like Seneca College, Fanshawe, Yorkville University, University of Manitoba, etc.
- If destination is "USA", recommend universities like Arizona State University, Pace University, Illinois Institute of Technology, etc.
- If destination is "Germany", suggest options like GISMA University of Applied Sciences, BSBI, IU International University of Applied Sciences, etc.

Return ONLY the raw JSON object conforming to the schema. Do not wrap in markdown blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              courses: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    universityName: { type: Type.STRING },
                    courseName: { type: Type.STRING },
                    country: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    intake: { type: Type.STRING },
                    annualTuition: { type: Type.STRING },
                    estimatedLivingCost: { type: Type.STRING },
                    entryRequirements: { type: Type.STRING },
                    englishRequirement: { type: Type.STRING },
                    scholarshipAvailable: { type: Type.STRING },
                    reasonForMatch: { type: Type.STRING },
                    ranking: { type: Type.STRING }
                  },
                  required: [
                    "id", "universityName", "courseName", "country", "duration", 
                    "intake", "annualTuition", "estimatedLivingCost", 
                    "entryRequirements", "englishRequirement", "scholarshipAvailable", 
                    "reasonForMatch", "ranking"
                  ]
                }
              }
            },
            required: ["courses"]
          }
        }
      });

      const dataText = response.text ? response.text.trim() : "{}";
      const parsed = JSON.parse(dataText);
      res.json({ demo: false, ...parsed });

    } catch (error: any) {
      console.error("Gemini course match failed:", error);
      res.status(500).json({ error: error.message || "Course matching failed" });
    }
  });

  // Vite middleware for assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Full mock course catalog fallback function
function getDemoMatch(field: string, dest: string, budget: string) {
  const targetField = field || "Computing & IT";
  const targetDest = dest || "United Kingdom";

  return [
    {
      id: "demo-uwl-se",
      universityName: "University of West London",
      courseName: `BSc (Hons) AI and ${targetField}`,
      country: targetDest,
      duration: "3 Years (or 4 Years with Placement Year)",
      intake: "September / January",
      annualTuition: budget === "Low" ? "£13,250 / Year" : budget === "Mid" ? "£14,750 / Year" : "£16,500 / Year",
      estimatedLivingCost: "£12,000 / Year",
      entryRequirements: "Successful completion of Local/London A-Levels (2 Passes) or equivalent Foundation/BTEC.",
      englishRequirement: "IELTS 6.0 (with minimum 5.5 in each component) or equivalent Pearson PTE.",
      scholarshipAvailable: "International Ambassador Scholarship worth £2,000 tuition fee discount.",
      reasonForMatch: `Excellent practical syllabus directly aligned with ${targetField}. Matches your budget and provides stellar career prospects in ${targetDest}.`,
      ranking: "Ranked Top 30 University in the UK (Guardian University Guide)"
    },
    {
      id: "demo-cov-cs",
      universityName: "Coventry University",
      courseName: `BSc (Hons) ${targetField} & Software Architecture`,
      country: targetDest,
      duration: "3 Years",
      intake: "September / January / May",
      annualTuition: budget === "Low" ? "£14,500 / Year" : budget === "Mid" ? "£16,800 / Year" : "£18,900 / Year",
      estimatedLivingCost: "£9,500 / Year (Midlands cost of living is budget-friendly)",
      entryRequirements: "Normally BBC at A-Level or Pearson BTEC Level 3 (or standard high-school diploma plus Foundation).",
      englishRequirement: "IELTS 6.5 with at least 5.5 in each skills section.",
      scholarshipAvailable: "Territory / Academic Merit Scholarship worth £1,500 based on results.",
      reasonForMatch: "Premium gold-tier teaching excellence with dual-accredited degrees. Matches high-demand industry requirements.",
      ranking: "Named University of the Year for Student Experience (The Times)"
    },
    {
      id: "demo-deakin-mit",
      universityName: "Deakin University",
      courseName: `Bachelor of Applied ${targetField} (Professional Practice)`,
      country: targetDest === "United Kingdom" ? "Australia" : targetDest,
      duration: "3 Years",
      intake: "March / July / November",
      annualTuition: budget === "Low" ? "AUD 29,800 / Year" : "AUD 34,200 / Year",
      estimatedLivingCost: "AUD 21,000 / Year",
      entryRequirements: "Satisfactory completion of Year 12 (High School) with high average grades.",
      englishRequirement: "IELTS 6.0 with no band less than 6.0.",
      scholarshipAvailable: "Deakin International Scholarship covering up to 25% of tuition fees.",
      reasonForMatch: "Invaluable professional internship semester integrated into the curriculum, maximizing global employment options.",
      ranking: "Top 1% of Universities Globally (ARWU)"
    },
    {
      id: "demo-gisma-biz",
      universityName: "GISMA University of Applied Sciences",
      courseName: `BSc International ${targetField} & Management`,
      country: targetDest === "United Kingdom" ? "Germany" : targetDest,
      duration: "3 Years (Berlin Campus)",
      intake: "September / January",
      annualTuition: "€11,500 / Year",
      estimatedLivingCost: "€10,500 / Year",
      entryRequirements: "Secondary School Certificate with satisfactory grades and direct entry test pass.",
      englishRequirement: "IELTS 6.0 or free internal online English testing available.",
      scholarshipAvailable: "Up to 30% Early Bird Scholarship and flexible instalment plans.",
      reasonForMatch: "Allows post-study 18-month career seeker visa in Germany. Taught 100% in English in the tech hub of Berlin.",
      ranking: "AMBA Accredited, State-Recognized German Institution"
    }
  ];
}

startServer();
