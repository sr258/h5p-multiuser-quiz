import { IParams } from "../../types";

export const sampleParams: IParams = {
  questions: {
    params: {
      choices: [
        {
          subContentId: "28c27034-3e8b-4e3c-bb99-051debe045af",
          question: "<p>Frage 1</p>\n",
          answers: [
            "<p>Richtig</p>\n",
            "<p>Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1 Falsch 1.1</p>\n",
            "<p>Falsch 1.2</p>\n",
            "<p>Falsch 1.3</p>\n",
          ],
        },
        {
          subContentId: "5ff19ca8-07b2-4828-baeb-04b07e0a7c57",
          question: "<p>Frage 2</p>\n",
          answers: [
            "<p>Richtig</p>\n",
            "<p>Falsch 2.1</p>\n",
            "<p>Falsch 2.2</p>\n",
            "<p>Falsch 2.3</p>\n",
          ],
        },
        {
          subContentId: "cfb5f209-5e2e-405a-ae0d-aace1ced2463",
          question: "<p>Frage 3</p>\n",
          answers: [
            "<p>Richtig</p>\n",
            "<p>Falsch 3.1</p>\n",
            "<p>Falsch 3.2</p>\n",
            "<p>Falsch 3.3</p>\n",
          ],
        },
      ],
      overallFeedback: [{ from: 0, to: 100, feedback: "kein Rückmeldung" }],
      behaviour: {
        autoContinue: false,
        timeoutCorrect: 2000,
        timeoutWrong: 3000,
        soundEffectsEnabled: false,
        enableRetry: false,
        enableSolutionsButton: false,
        passPercentage: 100,
      },
      l10n: {
        nextButtonLabel: "Weiter",
        showSolutionButtonLabel: "Lösung anzeigen",
        retryButtonLabel: "Wiederholen",
        solutionViewTitle: "Lösung",
        correctText: "Richtig!",
        incorrectText: "Falsch!",
        muteButtonLabel: "Stumm schalten",
        closeButtonLabel: "Schließen",
        slideOfTotal: "Seite :num von :total",
        scoreBarLabel: "Du hast :num von :total Punkten erreicht.",
        solutionListQuestionNumber: "Frage :num",
        a11yShowSolution:
          "Die Lösung anzeigen. Die richtigen Lösungen werden in der Aufgabe angezeigt.",
        a11yRetry:
          "Die Aufgabe wiederholen. Alle Versuche werden zurückgesetzt und die Aufgabe wird erneut gestartet.",
      },
    },
    library: "H5P.SingleChoiceSet 1.11",
    subContentId: "48102dba-aa42-48b9-b462-e2f65bbccc18",
    metadata: {
      contentType: "Single Choice-Fragen (Single Choice Set)",
      license: "U",
      title: "Unbenannt: Single Choice-Fragen (Single Choice Set)",
      authors: [],
      changes: [],
      extraTitle: "Unbenannt: Single Choice-Fragen (Single Choice Set)",
    },
  },
  l10n: {},
};
