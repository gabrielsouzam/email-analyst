import { useState } from "react";
import { EmailAnalysis } from "./components/EmailAnalysis";
import { Header } from "./components/Header";
import { UploadEmailForm } from "./components/UploadEmailForm";
import { Toaster } from "sonner";

export function App() {
  const [emailAnalysis, setEmailAnalysis] = useState<EmailAnalysisResponse | null>(null)

  function handleSetEmailAnalysis(emailAnalysis: EmailAnalysisResponse | null) {
    setEmailAnalysis(emailAnalysis)
  }

  return (
    <>
      <Toaster richColors theme="light" />
      <div className="font-poppins pb-10">
      <Header />
      <main className="my-10 flex items-center flex-col px-10">
        <h2 className="text-2xl font-medium text-blue-950 mb-10">
          Análise seu e-mail
        </h2>

        <UploadEmailForm handleSetEmailAnalysis={handleSetEmailAnalysis}/>

        {emailAnalysis ? (
          <EmailAnalysis emailAnalysis={emailAnalysis} />
        ) : <></>
        }
      </main>
    </div>
    </>
    
  );
}
